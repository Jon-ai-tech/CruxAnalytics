import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useTranslation } from '@/lib/i18n-context';

export default function ProjectsScreen() {
  const { t } = useTranslation();

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          <Text className="text-3xl font-bold text-foreground">
            {t('projects_list.title')}
          </Text>
          
          <View className="bg-surface rounded-2xl p-8 border border-border items-center">
            <Text className="text-base text-muted text-center">
              Projects list coming soon
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
