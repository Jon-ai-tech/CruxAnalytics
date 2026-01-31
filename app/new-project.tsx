import { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ScreenContainer } from '@/components/screen-container';
import { TemplateSelector } from '@/components/template-selector';
import { useTranslation } from '@/lib/i18n-context';
import { saveProject, saveDraft, loadDraft, clearDraft, hasDraft } from '@/lib/project-storage';
import { calculateFinancialMetrics } from '@/lib/financial-calculator';
import { eventEmitter, Events } from '@/lib/event-emitter';
import {
  scheduleProjectReminder,
  type ReminderFrequency,
  getFrequencyDisplayName,
  areNotificationsEnabled,
} from '@/lib/notification-manager';
import type { ProjectData } from '@/types/project';
import type { ProjectTemplate } from '@/lib/project-templates';
import { useAutoSave } from '@/hooks/use-auto-save';
import { AutoSaveIndicator } from '@/components/auto-save-indicator';

export default function NewProjectScreen() {
  const { t, language } = useTranslation();
  const [name, setName] = useState('');
  const [initialInvestment, setInitialInvestment] = useState('');
  const [discountRate, setDiscountRate] = useState('10');
  const [projectDuration, setProjectDuration] = useState('24');
  const [yearlyRevenue, setYearlyRevenue] = useState('');
  const [revenueGrowth, setRevenueGrowth] = useState('5');
  const [operatingCosts, setOperatingCosts] = useState('');
  const [maintenanceCosts, setMaintenanceCosts] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(true);
  const [reminderFrequency, setReminderFrequency] = useState<ReminderFrequency>('monthly');
  const [notificationsAvailable, setNotificationsAvailable] = useState(false);

  // Check if notifications are available
  useEffect(() => {
    checkNotifications();
  }, []);

  const checkNotifications = async () => {
    const enabled = await areNotificationsEnabled();
    setNotificationsAvailable(enabled);

    if (enabled) {
      const savedFrequency = await AsyncStorage.getItem('@default_reminder_frequency');
      if (savedFrequency) {
        setReminderFrequency(savedFrequency as ReminderFrequency);
      }
    }
  };

  // Load draft on mount
  useEffect(() => {
    const loadDraftData = async () => {
      const hasDraftData = await hasDraft('new');
      if (hasDraftData) {
        setShowTemplateSelector(false);
        Alert.alert(
          t('form.draft_found'),
          t('form.draft_found_message'),
          [
            {
              text: t('form.discard_draft'),
              style: 'destructive',
              onPress: async () => {
                await clearDraft('new');
              },
            },
            {
              text: t('form.load_draft'),
              onPress: async () => {
                const draft = await loadDraft('new');
                if (draft) {
                  setName(draft.name || '');
                  setInitialInvestment(draft.initialInvestment?.toString() || '');
                  setDiscountRate(draft.discountRate?.toString() || '10');
                  setProjectDuration(draft.projectDuration?.toString() || '24');
                  setYearlyRevenue(draft.yearlyRevenue?.toString() || '');
                  setRevenueGrowth(draft.revenueGrowth?.toString() || '5');
                  setOperatingCosts(draft.operatingCosts?.toString() || '');
                  setMaintenanceCosts(draft.maintenanceCosts?.toString() || '');
                }
              },
            },
          ]
        );
      } else {
        setShowTemplateSelector(true);
      }
    };
    loadDraftData();
  }, [t]);

  const handleSelectTemplate = (template: ProjectTemplate) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    // Apply template data to form
    if (template.id !== 'blank') {
      setInitialInvestment(template.data.initialInvestment.toString());
      setYearlyRevenue(template.data.yearlyRevenue.toString());
      setOperatingCosts((template.data.monthlyCosts * 12).toString());
      setProjectDuration(template.data.projectDuration.toString());
      setDiscountRate(template.data.discountRate.toString());
    }
    
    setShowTemplateSelector(false);
  };

  // Auto-save draft
  const formData = {
    name,
    initialInvestment: parseFloat(initialInvestment) || 0,
    discountRate: parseFloat(discountRate) || 10,
    projectDuration: parseFloat(projectDuration) || 24,
    yearlyRevenue: parseFloat(yearlyRevenue) || 0,
    revenueGrowth: parseFloat(revenueGrowth) || 5,
    operatingCosts: parseFloat(operatingCosts) || 0,
    maintenanceCosts: parseFloat(maintenanceCosts) || 0,
  };

  const { status, lastSaved } = useAutoSave({
    data: formData,
    onSave: async (data) => {
      await saveDraft('new', data);
    },
    enabled: name.trim().length > 0, // Only auto-save if name is not empty
  });

  const handleSave = async () => {
    // Validation
    if (!name.trim()) {
      Alert.alert(t('validations.error'), t('validations.project_name_required'));
      return;
    }

    const investment = parseFloat(initialInvestment);
    const revenue = parseFloat(yearlyRevenue);
    const opCosts = parseFloat(operatingCosts);
    const maintCosts = parseFloat(maintenanceCosts);

    if (isNaN(investment) || investment <= 0) {
      Alert.alert(t('validations.error'), t('validations.invalid_investment'));
      return;
    }

    if (isNaN(revenue) || revenue <= 0) {
      Alert.alert(t('validations.error'), t('validations.invalid_revenue'));
      return;
    }

    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    setLoading(true);

    try {
      // Calculate results for all scenarios
      const baseParams = {
        initialInvestment: investment,
        discountRate: parseFloat(discountRate),
        projectDuration: parseInt(projectDuration),
        yearlyRevenue: revenue,
        revenueGrowth: parseFloat(revenueGrowth),
        operatingCosts: opCosts || 0,
        maintenanceCosts: maintCosts || 0,
      };

      const expectedCase = calculateFinancialMetrics({ ...baseParams, multiplier: 1.0 });
      const bestCase = calculateFinancialMetrics({ ...baseParams, multiplier: 1.2 });
      const worstCase = calculateFinancialMetrics({ ...baseParams, multiplier: 0.8 });

      const results = {
        ...expectedCase,
        roiBest: bestCase.roi,
        npvBest: bestCase.npv,
        paybackBest: bestCase.paybackPeriod,
        irrBest: bestCase.irr,
        roiWorst: worstCase.roi,
        npvWorst: worstCase.npv,
        paybackWorst: worstCase.paybackPeriod,
        irrWorst: worstCase.irr,
      };

      // Create project
      const project: ProjectData = {
        id: Date.now().toString(),
        name: name.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        initialInvestment: investment,
        discountRate: parseFloat(discountRate),
        projectDuration: parseInt(projectDuration),
        yearlyRevenue: revenue,
        revenueGrowth: parseFloat(revenueGrowth),
        operatingCosts: opCosts || 0,
        maintenanceCosts: maintCosts || 0,
        bestCaseMultiplier: 1.2,
        worstCaseMultiplier: 0.8,
        results,
      };

      await saveProject(project);
      
      // Emit event to refresh other screens
      eventEmitter.emit(Events.PROJECT_CREATED, project.id);

      // Schedule reminder if notifications are enabled
      if (notificationsAvailable && reminderFrequency !== 'none') {
        try {
          await scheduleProjectReminder(project.id, project.name, reminderFrequency);
        } catch (error) {
          console.error('Error scheduling reminder:', error);
        }
      }

      // Clear draft after successful save
      await clearDraft('new');

      if (Platform.OS !== 'web') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      // Navigate to project details
      router.replace(`/project/${project.id}`);
    } catch (error) {
      console.error('Error saving project:', error);
      Alert.alert(t('validations.error'), t('validations.save_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      >
        {showTemplateSelector ? (
          <TemplateSelector onSelectTemplate={handleSelectTemplate} />
        ) : (
          <>
            {/* Header */}
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-3xl font-bold text-foreground">
                  {t('form.new_project')}
                </Text>
                <AutoSaveIndicator status={status} lastSaved={lastSaved} />
              </View>
              <Text className="text-sm text-muted">
                {t('form.fill_details')}
              </Text>
            </View>

        {/* Form Fields */}
        <View className="gap-4">
          {/* Project Name */}
          <View>
            <Text className="text-sm font-semibold text-foreground mb-2">
              {t('form.project_name')} *
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder={t('form.project_name_placeholder')}
              placeholderTextColor="#9CA3AF"
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
            />
          </View>

          {/* Initial Investment */}
          <View>
            <Text className="text-sm font-semibold text-foreground mb-2">
              {t('form.initial_investment')} * ($)
            </Text>
            <TextInput
              value={initialInvestment}
              onChangeText={setInitialInvestment}
              placeholder="100000"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
            />
          </View>

          {/* Project Duration */}
          <View>
            <Text className="text-sm font-semibold text-foreground mb-2">
              {t('form.project_duration')} ({t('common.months')})
            </Text>
            <TextInput
              value={projectDuration}
              onChangeText={setProjectDuration}
              placeholder="24"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
            />
          </View>

          {/* Yearly Revenue */}
          <View>
            <Text className="text-sm font-semibold text-foreground mb-2">
              {t('form.yearly_revenue')} * ($)
            </Text>
            <TextInput
              value={yearlyRevenue}
              onChangeText={setYearlyRevenue}
              placeholder="50000"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
            />
          </View>

          {/* Revenue Growth */}
          <View>
            <Text className="text-sm font-semibold text-foreground mb-2">
              {t('form.revenue_growth')} (%)
            </Text>
            <TextInput
              value={revenueGrowth}
              onChangeText={setRevenueGrowth}
              placeholder="5"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
            />
          </View>

          {/* Operating Costs */}
          <View>
            <Text className="text-sm font-semibold text-foreground mb-2">
              {t('form.operating_costs')} ($)
            </Text>
            <TextInput
              value={operatingCosts}
              onChangeText={setOperatingCosts}
              placeholder="20000"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
            />
          </View>

          {/* Maintenance Costs */}
          <View>
            <Text className="text-sm font-semibold text-foreground mb-2">
              {t('form.maintenance_costs')} ($)
            </Text>
            <TextInput
              value={maintenanceCosts}
              onChangeText={setMaintenanceCosts}
              placeholder="5000"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
            />
          </View>

          {/* Discount Rate */}
          <View>
            <Text className="text-sm font-semibold text-foreground mb-2">
              {t('form.discount_rate')} (%)
            </Text>
            <TextInput
              value={discountRate}
              onChangeText={setDiscountRate}
              placeholder="10"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
            />
          </View>
        </View>

        {/* Reminder Frequency (if notifications enabled) */}
        {notificationsAvailable && (
          <View className="mt-6">
            <Text className="text-sm font-semibold text-foreground mb-2">
              🔔 {t('notifications.reminder_frequency')}
            </Text>
            <View className="bg-surface border border-border rounded-xl overflow-hidden">
              {(['none', 'weekly', 'biweekly', 'monthly', 'quarterly'] as ReminderFrequency[]).map(
                (freq) => (
                  <TouchableOpacity
                    key={freq}
                    onPress={() => {
                      if (Platform.OS !== 'web') {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      }
                      setReminderFrequency(freq);
                    }}
                    className="flex-row items-center justify-between p-4 border-b border-border/50"
                  >
                    <Text
                      className={`text-base ${
                        reminderFrequency === freq
                          ? 'text-primary font-semibold'
                          : 'text-foreground'
                      }`}
                    >
                      {getFrequencyDisplayName(freq, language)}
                    </Text>
                    {reminderFrequency === freq && (
                      <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
                        <Text className="text-background text-xs font-bold">✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                )
              )}
            </View>
            <Text className="text-xs text-muted mt-2">
              {t('notifications.reminder_frequency_desc')}
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <View className="gap-3 mt-8">
          <TouchableOpacity
            onPress={handleSave}
            disabled={loading}
            className={`bg-primary rounded-xl py-4 items-center ${
              loading ? 'opacity-50' : ''
            }`}
          >
            <Text className="text-background font-semibold text-base">
              {loading ? t('common.saving') : t('common.calculate_save')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            disabled={loading}
            className="bg-surface border border-border rounded-xl py-4 items-center"
          >
            <Text className="text-foreground font-semibold text-base">
              {t('common.cancel')}
            </Text>
          </TouchableOpacity>
        </View>
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
