import React from 'react';
import { View } from 'react-native';
import { SkeletonLoader, SkeletonText } from '@/components/ui/skeleton-loader';

export function SkeletonProjectCard() {
  return (
    <View className="bg-surface rounded-xl p-4 border border-border mb-3">
      {/* Header */}
      <View className="mb-3">
        <SkeletonLoader width="70%" height={24} borderRadius={6} style={{ marginBottom: 8 }} />
        <SkeletonLoader width="40%" height={14} borderRadius={4} />
      </View>

      {/* Metrics Grid */}
      <View className="flex-row gap-2 mb-3">
        <View className="flex-1 bg-background rounded-lg p-3">
          <SkeletonLoader width="30%" height={12} borderRadius={4} style={{ marginBottom: 6 }} />
          <SkeletonLoader width="60%" height={20} borderRadius={6} />
        </View>
        <View className="flex-1 bg-background rounded-lg p-3">
          <SkeletonLoader width="30%" height={12} borderRadius={4} style={{ marginBottom: 6 }} />
          <SkeletonLoader width="60%" height={20} borderRadius={6} />
        </View>
      </View>

      {/* Footer */}
      <View className="flex-row justify-between items-center">
        <SkeletonLoader width="35%" height={14} borderRadius={4} />
        <SkeletonLoader width={80} height={32} borderRadius={8} />
      </View>
    </View>
  );
}

export function SkeletonProjectList({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonProjectCard key={index} />
      ))}
    </>
  );
}
