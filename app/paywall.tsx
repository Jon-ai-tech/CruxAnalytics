import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { useTranslation } from '@/lib/i18n-context';
import { useSubscription } from '@/hooks/use-subscription';
import { IconSymbol } from '@/components/ui/icon-symbol';

/**
 * Paywall Screen - Subscription upgrade flow
 * 
 * Shown when FREE users exceed their AI analysis limit
 */
export default function PaywallScreen() {
  const colors = useColors();
  const { t } = useTranslation();
  const { status, packages, loading, error, purchasePackage, restorePurchases } = useSubscription();

  const handlePurchase = async (pkg: any) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    const success = await purchasePackage(pkg);
    
    if (success) {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      router.back();
    }
  };

  const handleRestore = async () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    const success = await restorePurchases();
    
    if (success) {
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      router.back();
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
        {/* Header */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 rounded-full bg-primary/10 items-center justify-center mb-4">
            <Text className="text-4xl">🚀</Text>
          </View>
          <Text className="text-3xl font-bold text-foreground text-center mb-2">
            {t('paywall.title')}
          </Text>
          <Text className="text-base text-muted text-center">
            {t('paywall.subtitle')}
          </Text>
        </View>

        {/* Current Status */}
        <View className="bg-surface rounded-2xl p-4 mb-6 border border-border">
          <Text className="text-sm text-muted mb-2">{t('paywall.currentPlan')}</Text>
          <Text className="text-xl font-bold text-foreground mb-1">
            {status.tier === 'free' ? t('paywall.freePlan') : t('paywall.premiumPlan')}
          </Text>
          <Text className="text-sm text-muted">
            {t('paywall.analysisUsed', {
              used: String(status.aiAnalysisLimit - status.aiAnalysisRemaining),
              total: String(status.aiAnalysisLimit),
            })}
          </Text>
        </View>

        {/* Features */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-foreground mb-4">
            {t('paywall.premiumFeatures')}
          </Text>
          
          {[
            { icon: '∞', text: t('paywall.feature1') },
            { icon: '⚡', text: t('paywall.feature2') },
            { icon: '📊', text: t('paywall.feature3') },
            { icon: '🎯', text: t('paywall.feature4') },
          ].map((feature, index) => (
            <View key={index} className="flex-row items-center mb-3">
              <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center mr-3">
                <Text className="text-lg">{feature.icon}</Text>
              </View>
              <Text className="text-base text-foreground flex-1">{feature.text}</Text>
            </View>
          ))}
        </View>

        {/* Packages */}
        {loading ? (
          <View className="items-center py-8">
            <ActivityIndicator size="large" color={colors.primary} />
            <Text className="text-muted mt-4">{t('paywall.loading')}</Text>
          </View>
        ) : packages.length > 0 ? (
          <View className="mb-6">
            {packages.map((pkg, index) => (
              <TouchableOpacity
                key={pkg.identifier}
                onPress={() => handlePurchase(pkg)}
                className="bg-primary rounded-2xl p-6 mb-4"
                style={{ opacity: loading ? 0.6 : 1 }}
                disabled={loading}
              >
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-xl font-bold text-white">
                    {pkg.product.title}
                  </Text>
                  <Text className="text-2xl font-bold text-white">
                    {pkg.product.priceString}
                  </Text>
                </View>
                <Text className="text-white/80 text-sm">
                  {pkg.product.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View className="bg-surface rounded-2xl p-6 mb-6 border border-border">
            <Text className="text-center text-muted">
              {t('paywall.noPackages')}
            </Text>
          </View>
        )}

        {/* Error */}
        {error && (
          <View className="bg-error/10 rounded-xl p-4 mb-4 border border-error">
            <Text className="text-error text-center">{error}</Text>
          </View>
        )}

        {/* Restore Purchases */}
        <TouchableOpacity
          onPress={handleRestore}
          className="py-3 mb-4"
          disabled={loading}
        >
          <Text className="text-primary text-center font-medium">
            {t('paywall.restorePurchases')}
          </Text>
        </TouchableOpacity>

        {/* Close */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="py-3"
        >
          <Text className="text-muted text-center">
            {t('paywall.close')}
          </Text>
        </TouchableOpacity>

        {/* Terms */}
        <Text className="text-xs text-muted text-center mt-6">
          {t('paywall.terms')}
        </Text>
      </ScrollView>
    </ScreenContainer>
  );
}
