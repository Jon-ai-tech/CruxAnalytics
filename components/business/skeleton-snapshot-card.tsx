import React from 'react';
import { View } from 'react-native';
import { SkeletonLoader } from '@/components/ui/skeleton-loader';

export function SkeletonSnapshotCard() {
  return (
    <View className="bg-surface rounded-xl p-4 border border-border mb-4">
      {/* Header */}
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <View className="flex-row items-center gap-2 mb-1">
            <SkeletonLoader width="60%" height={20} borderRadius={6} />
          </View>
          <SkeletonLoader width="40%" height={12} borderRadius={4} />
        </View>
      </View>

      {/* Adjustments Section */}
      <View className="mb-3 bg-background rounded-lg p-3">
        <SkeletonLoader width="30%" height={14} borderRadius={4} style={{ marginBottom: 8 }} />
        <View className="flex-row gap-4">
          <View className="flex-1">
            <SkeletonLoader width="50%" height={10} borderRadius={3} style={{ marginBottom: 4 }} />
            <SkeletonLoader width="70%" height={16} borderRadius={4} />
          </View>
          <View className="flex-1">
            <SkeletonLoader width="50%" height={10} borderRadius={3} style={{ marginBottom: 4 }} />
            <SkeletonLoader width="70%" height={16} borderRadius={4} />
          </View>
          <View className="flex-1">
            <SkeletonLoader width="50%" height={10} borderRadius={3} style={{ marginBottom: 4 }} />
            <SkeletonLoader width="70%" height={16} borderRadius={4} />
          </View>
        </View>
      </View>

      {/* Metrics Grid */}
      <View className="gap-2 mb-3">
        <View className="flex-row gap-2">
          <View className="flex-1 bg-background rounded-lg p-3">
            <SkeletonLoader width="30%" height={12} borderRadius={4} style={{ marginBottom: 6 }} />
            <SkeletonLoader width="60%" height={18} borderRadius={6} />
          </View>
          <View className="flex-1 bg-background rounded-lg p-3">
            <SkeletonLoader width="30%" height={12} borderRadius={4} style={{ marginBottom: 6 }} />
            <SkeletonLoader width="60%" height={18} borderRadius={6} />
          </View>
        </View>
        <View className="flex-row gap-2">
          <View className="flex-1 bg-background rounded-lg p-3">
            <SkeletonLoader width="30%" height={12} borderRadius={4} style={{ marginBottom: 6 }} />
            <SkeletonLoader width="60%" height={18} borderRadius={6} />
          </View>
          <View className="flex-1 bg-background rounded-lg p-3">
            <SkeletonLoader width="30%" height={12} borderRadius={4} style={{ marginBottom: 6 }} />
            <SkeletonLoader width="60%" height={18} borderRadius={6} />
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row gap-2">
        <SkeletonLoader width="48%" height={36} borderRadius={8} />
        <SkeletonLoader width="48%" height={36} borderRadius={8} />
      </View>
    </View>
  );
}

export function SkeletonSnapshotList({ count = 2 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonSnapshotCard key={index} />
      ))}
    </>
  );
}
