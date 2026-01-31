/**
 * Purchase Service Interface (Adapter Pattern)
 * 
 * Abstraction layer for in-app purchases that allows switching between
 * real RevenueCat implementation and mock service for development/testing.
 */

export interface PurchasePackage {
  identifier: string;
  product: {
    identifier: string;
    title: string;
    description: string;
    priceString: string;
    price: number;
    currencyCode: string;
  };
}

export interface CustomerInfo {
  entitlements: {
    active: Record<string, any>;
  };
  activeSubscriptions: string[];
}

export interface PurchaseResult {
  customerInfo: CustomerInfo;
  userCancelled: boolean;
}

/**
 * Abstract interface for purchase operations
 */
export interface IPurchaseService {
  /**
   * Initialize the purchase service
   */
  configure(apiKey: string): Promise<void>;

  /**
   * Get available subscription packages
   */
  getOfferings(): Promise<PurchasePackage[]>;

  /**
   * Purchase a subscription package
   */
  purchasePackage(pkg: PurchasePackage): Promise<PurchaseResult>;

  /**
   * Restore previous purchases
   */
  restorePurchases(): Promise<CustomerInfo>;

  /**
   * Get current customer info
   */
  getCustomerInfo(): Promise<CustomerInfo>;

  /**
   * Check if user has active premium subscription
   */
  isPremium(): Promise<boolean>;
}
