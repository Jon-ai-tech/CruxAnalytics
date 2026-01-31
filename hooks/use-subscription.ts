import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { getPurchaseService, isUsingMockPayments } from '@/lib/purchase-service-factory';
import type { PurchasePackage } from '@/lib/purchase-service';

export interface SubscriptionStatus {
  tier: 'free' | 'premium';
  aiAnalysisRemaining: number;
  aiAnalysisLimit: number;
  canUseAI: boolean;
  isPremium: boolean;
  subscriptionExpiry: Date | null;
}

const REVENUECAT_API_KEYS = {
  ios: process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY || 'mock_ios_key',
  android: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY || 'mock_android_key',
};

/**
 * Hook to manage subscriptions with RevenueCat
 */
export function useSubscription() {
  const [status, setStatus] = useState<SubscriptionStatus>({
    tier: 'free',
    aiAnalysisRemaining: 3,
    aiAnalysisLimit: 3,
    canUseAI: true,
    isPremium: false,
    subscriptionExpiry: null,
  });
  const [packages, setPackages] = useState<PurchasePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize RevenueCat
  useEffect(() => {
    initializeRevenueCat();
  }, []);

  const initializeRevenueCat = async () => {
    try {
      const purchaseService = getPurchaseService();
      const isMock = isUsingMockPayments();

      if (isMock) {
        console.log('[Subscription] Using mock purchase service');
      }

      const apiKey = Platform.OS === 'ios' 
        ? REVENUECAT_API_KEYS.ios 
        : REVENUECAT_API_KEYS.android;

      // Configure purchase service
      await purchaseService.configure(apiKey);

      // Load offerings and customer info
      await loadOfferings();
      await refreshSubscriptionStatus();

      setLoading(false);
    } catch (err) {
      console.error('[Subscription] Initialization error:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize purchase service');
      setLoading(false);
    }
  };

  const loadOfferings = async () => {
    try {
      const purchaseService = getPurchaseService();
      const offerings = await purchaseService.getOfferings();
      setPackages(offerings);
    } catch (err) {
      console.error('[Subscription] Error loading offerings:', err);
    }
  };

  const refreshSubscriptionStatus = async () => {
    try {
      // Get status from backend
      const response = await fetch('/api/subscription/status', {
        headers: {
          'x-user-openid': 'current-user-openid', // TODO: Get from auth context
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStatus(data);
      }
    } catch (err) {
      console.error('[Subscription] Error refreshing status:', err);
    }
  };

  const purchasePackage = async (pkg: PurchasePackage): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const purchaseService = getPurchaseService();
      const result = await purchaseService.purchasePackage(pkg);
      
      if (result.userCancelled) {
        console.log('[Subscription] User cancelled purchase');
        return false;
      }

      // Check if purchase was successful
      const isPremium = result.customerInfo.entitlements.active['premium'] !== undefined;

      if (isPremium) {
        await refreshSubscriptionStatus();
        return true;
      }

      return false;
    } catch (err: any) {
      console.error('[Subscription] Purchase error:', err);
      setError(err.message || 'Purchase failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const restorePurchases = async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const purchaseService = getPurchaseService();
      const customerInfo = await purchaseService.restorePurchases();
      const isPremium = customerInfo.entitlements.active['premium'] !== undefined;

      if (isPremium) {
        await refreshSubscriptionStatus();
        return true;
      }

      setError('No active subscriptions found');
      return false;
    } catch (err) {
      console.error('[Subscription] Restore error:', err);
      setError(err instanceof Error ? err.message : 'Failed to restore purchases');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    status,
    packages,
    loading,
    error,
    purchasePackage,
    restorePurchases,
    refreshSubscriptionStatus,
  };
}
