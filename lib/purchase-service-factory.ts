import { Platform } from 'react-native';
import type { IPurchaseService } from './purchase-service';
import { MockPurchaseService } from './mock-purchase-service';
import { RevenueCatService } from './revenuecat-service';

/**
 * Purchase Service Factory
 * 
 * Creates the appropriate purchase service based on environment configuration.
 * Uses MockPurchaseService when EXPO_PUBLIC_USE_MOCK_PAYMENTS=true or on web.
 * Uses RevenueCatService for production on iOS/Android.
 */

const USE_MOCK_PAYMENTS = process.env.EXPO_PUBLIC_USE_MOCK_PAYMENTS === 'true';

let purchaseServiceInstance: IPurchaseService | null = null;

export function getPurchaseService(): IPurchaseService {
  if (purchaseServiceInstance) {
    return purchaseServiceInstance;
  }

  // Always use mock on web platform
  if (Platform.OS === 'web') {
    console.log('[PurchaseFactory] Using MockPurchaseService (web platform)');
    purchaseServiceInstance = new MockPurchaseService();
    return purchaseServiceInstance;
  }

  // Use mock if explicitly enabled via env var
  if (USE_MOCK_PAYMENTS) {
    console.log('[PurchaseFactory] Using MockPurchaseService (EXPO_PUBLIC_USE_MOCK_PAYMENTS=true)');
    purchaseServiceInstance = new MockPurchaseService();
    return purchaseServiceInstance;
  }

  // Use real RevenueCat service for production
  console.log('[PurchaseFactory] Using RevenueCatService (production)');
  purchaseServiceInstance = new RevenueCatService();
  return purchaseServiceInstance;
}

/**
 * Check if currently using mock service
 */
export function isUsingMockPayments(): boolean {
  return Platform.OS === 'web' || USE_MOCK_PAYMENTS;
}

/**
 * Reset service instance (useful for testing)
 */
export function resetPurchaseService(): void {
  purchaseServiceInstance = null;
}
