import { getDb, getUserByOpenId } from '../db';
import { users } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

/**
 * Subscription Service - Manages user tiers and usage limits
 * 
 * FREE tier: 3 AI analysis per month
 * PREMIUM tier: Unlimited AI analysis
 */

export const SUBSCRIPTION_LIMITS = {
  FREE_AI_ANALYSIS_LIMIT: 3,
  PREMIUM_AI_ANALYSIS_LIMIT: Infinity,
} as const;

export type SubscriptionTier = 'free' | 'premium';

export interface SubscriptionStatus {
  tier: SubscriptionTier;
  aiAnalysisRemaining: number;
  aiAnalysisLimit: number;
  canUseAI: boolean;
  isPremium: boolean;
  subscriptionExpiry: Date | null;
}

/**
 * Check if user can use AI analysis feature
 */
export async function canUserUseAI(openId: string): Promise<boolean> {
  const status = await getSubscriptionStatus(openId);
  return status.canUseAI;
}

/**
 * Get user's subscription status and limits
 */
export async function getSubscriptionStatus(openId: string): Promise<SubscriptionStatus> {
  const user = await getUserByOpenId(openId);
  
  if (!user) {
    // Default for non-authenticated users
    return {
      tier: 'free',
      aiAnalysisRemaining: 0,
      aiAnalysisLimit: 0,
      canUseAI: false,
      isPremium: false,
      subscriptionExpiry: null,
    };
  }

  const isPremium = user.subscriptionTier === 'premium' && 
    (!user.subscriptionExpiry || user.subscriptionExpiry > new Date());

  if (isPremium) {
    return {
      tier: 'premium',
      aiAnalysisRemaining: SUBSCRIPTION_LIMITS.PREMIUM_AI_ANALYSIS_LIMIT,
      aiAnalysisLimit: SUBSCRIPTION_LIMITS.PREMIUM_AI_ANALYSIS_LIMIT,
      canUseAI: true,
      isPremium: true,
      subscriptionExpiry: user.subscriptionExpiry,
    };
  }

  // FREE tier - check if we need to reset monthly counter
  const now = new Date();
  const resetDate = user.aiAnalysisResetDate;
  const daysSinceReset = Math.floor((now.getTime() - resetDate.getTime()) / (1000 * 60 * 60 * 24));
  
  let currentCount = user.aiAnalysisCount;
  
  // Reset counter if more than 30 days have passed
  if (daysSinceReset >= 30) {
    currentCount = 0;
    await resetAIAnalysisCount(openId);
  }

  const remaining = Math.max(0, SUBSCRIPTION_LIMITS.FREE_AI_ANALYSIS_LIMIT - currentCount);

  return {
    tier: 'free',
    aiAnalysisRemaining: remaining,
    aiAnalysisLimit: SUBSCRIPTION_LIMITS.FREE_AI_ANALYSIS_LIMIT,
    canUseAI: remaining > 0,
    isPremium: false,
    subscriptionExpiry: null,
  };
}

/**
 * Increment AI analysis usage count for FREE users
 */
export async function incrementAIAnalysisCount(openId: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn('[Subscription] Cannot increment AI count: database not available');
    return;
  }

  const user = await getUserByOpenId(openId);
  if (!user) {
    throw new Error('User not found');
  }

  // Don't increment for premium users
  if (user.subscriptionTier === 'premium') {
    return;
  }

  await db
    .update(users)
    .set({
      aiAnalysisCount: user.aiAnalysisCount + 1,
      updatedAt: new Date(),
    })
    .where(eq(users.openId, openId));
}

/**
 * Reset AI analysis count (called monthly or when upgrading to premium)
 */
export async function resetAIAnalysisCount(openId: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn('[Subscription] Cannot reset AI count: database not available');
    return;
  }

  await db
    .update(users)
    .set({
      aiAnalysisCount: 0,
      aiAnalysisResetDate: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(users.openId, openId));
}

/**
 * Upgrade user to premium tier
 */
export async function upgradeToPremium(
  openId: string,
  revenueCatUserId: string,
  expiryDate?: Date
): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error('Database not available');
  }

  await db
    .update(users)
    .set({
      subscriptionTier: 'premium',
      subscriptionExpiry: expiryDate || null,
      revenueCatUserId,
      updatedAt: new Date(),
    })
    .where(eq(users.openId, openId));

  // Reset AI count when upgrading
  await resetAIAnalysisCount(openId);
}

/**
 * Downgrade user to free tier (when subscription expires)
 */
export async function downgradeToFree(openId: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error('Database not available');
  }

  await db
    .update(users)
    .set({
      subscriptionTier: 'free',
      subscriptionExpiry: null,
      updatedAt: new Date(),
    })
    .where(eq(users.openId, openId));
}

/**
 * Sync subscription status from RevenueCat webhook
 */
export async function syncRevenueCatSubscription(
  revenueCatUserId: string,
  isPremium: boolean,
  expiryDate?: Date
): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error('Database not available');
  }

  // Find user by RevenueCat ID
  const result = await db
    .select()
    .from(users)
    .where(eq(users.revenueCatUserId, revenueCatUserId))
    .limit(1);

  if (result.length === 0) {
    console.warn(`[Subscription] User with RevenueCat ID ${revenueCatUserId} not found`);
    return;
  }

  const user = result[0];

  if (isPremium) {
    await upgradeToPremium(user.openId, revenueCatUserId, expiryDate);
  } else {
    await downgradeToFree(user.openId);
  }
}
