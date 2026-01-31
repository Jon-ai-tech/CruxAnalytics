import { getDb } from '../db';
import { deviceUsage } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

/**
 * Device Usage Service - Device Fingerprinting for Abuse Prevention
 * 
 * Tracks AI analysis usage per physical device (not per user account).
 * Prevents users from bypassing FREE tier limits by creating multiple accounts
 * on the same device.
 */

export const DEVICE_LIMITS = {
  FREE_DEVICE_LIMIT: 3, // Max AI analyses per device for FREE users
} as const;

export interface DeviceUsageStatus {
  deviceId: string;
  usageCount: number;
  limit: number;
  remaining: number;
  canUse: boolean;
  lastUsedAt: Date;
}

/**
 * Check if device can use AI analysis feature
 */
export async function canDeviceUseAI(deviceId: string): Promise<boolean> {
  const status = await getDeviceUsageStatus(deviceId);
  return status.canUse;
}

/**
 * Get device usage status
 */
export async function getDeviceUsageStatus(deviceId: string): Promise<DeviceUsageStatus> {
  const db = await getDb();
  
  if (!db) {
    // If DB not available, allow usage (fail open for development)
    console.warn('[DeviceUsage] Database not available, allowing usage');
    return {
      deviceId,
      usageCount: 0,
      limit: DEVICE_LIMITS.FREE_DEVICE_LIMIT,
      remaining: DEVICE_LIMITS.FREE_DEVICE_LIMIT,
      canUse: true,
      lastUsedAt: new Date(),
    };
  }

  const result = await db
    .select()
    .from(deviceUsage)
    .where(eq(deviceUsage.deviceId, deviceId))
    .limit(1);

  if (result.length === 0) {
    // New device, no usage yet
    return {
      deviceId,
      usageCount: 0,
      limit: DEVICE_LIMITS.FREE_DEVICE_LIMIT,
      remaining: DEVICE_LIMITS.FREE_DEVICE_LIMIT,
      canUse: true,
      lastUsedAt: new Date(),
    };
  }

  const device = result[0];
  const remaining = Math.max(0, DEVICE_LIMITS.FREE_DEVICE_LIMIT - device.usageCount);

  return {
    deviceId,
    usageCount: device.usageCount,
    limit: DEVICE_LIMITS.FREE_DEVICE_LIMIT,
    remaining,
    canUse: remaining > 0,
    lastUsedAt: device.lastUsedAt,
  };
}

/**
 * Increment device usage count
 */
export async function incrementDeviceUsage(deviceId: string): Promise<void> {
  const db = await getDb();
  
  if (!db) {
    console.warn('[DeviceUsage] Database not available, cannot increment');
    return;
  }

  // Check if device exists
  const existing = await db
    .select()
    .from(deviceUsage)
    .where(eq(deviceUsage.deviceId, deviceId))
    .limit(1);

  if (existing.length === 0) {
    // Create new device record
    await db.insert(deviceUsage).values({
      deviceId,
      usageCount: 1,
      lastUsedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } else {
    // Increment existing device usage
    await db
      .update(deviceUsage)
      .set({
        usageCount: existing[0].usageCount + 1,
        lastUsedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(deviceUsage.deviceId, deviceId));
  }

  console.log(`[DeviceUsage] Incremented usage for device ${deviceId}`);
}

/**
 * Reset device usage (for testing or when user upgrades to premium)
 */
export async function resetDeviceUsage(deviceId: string): Promise<void> {
  const db = await getDb();
  
  if (!db) {
    console.warn('[DeviceUsage] Database not available, cannot reset');
    return;
  }

  await db
    .update(deviceUsage)
    .set({
      usageCount: 0,
      updatedAt: new Date(),
    })
    .where(eq(deviceUsage.deviceId, deviceId));

  console.log(`[DeviceUsage] Reset usage for device ${deviceId}`);
}

/**
 * Get all device usage records (for admin/debugging)
 */
export async function getAllDeviceUsage(): Promise<DeviceUsageStatus[]> {
  const db = await getDb();
  
  if (!db) {
    return [];
  }

  const devices = await db.select().from(deviceUsage);

  return devices.map((device) => ({
    deviceId: device.deviceId,
    usageCount: device.usageCount,
    limit: DEVICE_LIMITS.FREE_DEVICE_LIMIT,
    remaining: Math.max(0, DEVICE_LIMITS.FREE_DEVICE_LIMIT - device.usageCount),
    canUse: device.usageCount < DEVICE_LIMITS.FREE_DEVICE_LIMIT,
    lastUsedAt: device.lastUsedAt,
  }));
}
