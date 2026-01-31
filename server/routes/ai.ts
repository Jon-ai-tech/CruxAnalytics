import { Router } from 'express';
import { z } from 'zod';
import { generateFinancialInsights, checkOpenAIStatus, getAvailableModels } from '../services/openai-service';

const router = Router();

const insightRequestSchema = z.object({
  prompt: z.string(),
  language: z.enum(['es', 'en']),
  systemPrompt: z.string().optional(),
});

/**
 * Generate AI insights for business case analysis
 * POST /api/ai/insights
 * 
 * Requires authentication and checks BOTH user subscription AND device limits
 * to prevent abuse via multiple account creation.
 */
router.post('/insights', async (req, res) => {
  try {
    const { prompt, language, systemPrompt } = insightRequestSchema.parse(req.body);
    
    // Get user and device identifiers
    const openId = req.headers['x-user-openid'] as string | undefined;
    const deviceId = req.headers['x-device-id'] as string | undefined;
    
    if (!openId) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'You must be logged in to use AI analysis',
      });
    }

    if (!deviceId) {
      return res.status(400).json({
        error: 'Device ID required',
        message: 'Device identifier is required for usage tracking',
      });
    }
    
    // Import services
    const { getSubscriptionStatus } = await import('../services/subscription-service');
    const { canDeviceUseAI, incrementDeviceUsage, getDeviceUsageStatus } = await import('../services/device-usage-service');
    
    // Check user subscription status
    const userStatus = await getSubscriptionStatus(openId);
    const isPremium = userStatus.isPremium;

    // PREMIUM users bypass device limits
    if (!isPremium) {
      // FREE users: check device limits (prevents multi-account abuse)
      const canUseDevice = await canDeviceUseAI(deviceId);
      
      if (!canUseDevice) {
        const deviceStatus = await getDeviceUsageStatus(deviceId);
        return res.status(403).json({
          error: 'Device limit reached',
          message: `This device has used all ${deviceStatus.limit} free AI analyses. Upgrade to Premium for unlimited access.`,
          showPaywall: true,
          deviceStatus,
          subscriptionStatus: userStatus,
        });
      }
    }
    
    // Generate insights using OpenAI
    const insights = await generateFinancialInsights(prompt, language, systemPrompt);
    
    // Increment device usage for FREE users only
    if (!isPremium) {
      await incrementDeviceUsage(deviceId);
    }
    
    // Get updated statuses
    const updatedUserStatus = await getSubscriptionStatus(openId);
    const updatedDeviceStatus = await getDeviceUsageStatus(deviceId);
    
    res.json({
      insights,
      timestamp: new Date().toISOString(),
      provider: 'openai',
      subscriptionStatus: updatedUserStatus,
      deviceStatus: updatedDeviceStatus,
    });
  } catch (error) {
    console.error('Error generating AI insights:', error);
    
    // Return detailed error for debugging
    res.status(500).json({
      error: 'Failed to generate AI insights',
      message: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : undefined,
    });
  }
});

/**
 * Check OpenAI API connection status
 * GET /api/ai/status
 */
router.get('/status', async (req, res) => {
  try {
    const status = await checkOpenAIStatus();
    
    res.json({
      ...status,
      timestamp: new Date().toISOString(),
      availableModels: getAvailableModels(),
      currentModel: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    });
  } catch (error) {
    console.error('Error checking OpenAI status:', error);
    
    res.status(500).json({
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * Get available OpenAI models
 * GET /api/ai/models
 */
router.get('/models', (req, res) => {
  res.json({
    models: getAvailableModels(),
    current: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    timestamp: new Date().toISOString(),
  });
});

export default router;
