import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { cn } from '@/lib/utils';
import * as Haptics from 'expo-haptics';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  status?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  status = 'neutral',
  icon,
  onPress,
  className,
}: MetricCardProps) {
  const handlePress = () => {
    if (onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  const statusColors = {
    positive: 'text-success',
    negative: 'text-error',
    neutral: 'text-primary',
  };

  const content = (
    <View className={cn('bg-surface rounded-2xl p-4 border border-border', className)}>
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-sm text-muted">{title}</Text>
        {icon && <View>{icon}</View>}
      </View>
      
      <Text className={cn('text-2xl font-bold', statusColors[status])}>
        {value}
      </Text>
      
      {subtitle && (
        <Text className="text-xs text-muted mt-1">{subtitle}</Text>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          { opacity: pressed ? 0.7 : 1 },
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}
