import { Router } from 'express';
import { getSubscriptionStatus, upgradeToPremium, syncRevenueCatSubscription } from '../services/subscription-service';

const router = Router();

/**
 * Get current user's subscription status
 * GET /api/subscription/status
 */
router.get('/status', async (req, res) => {
  try {
    const openId = req.headers['x-user-openid'] as string | undefined;
    
    if (!openId) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'You must be logged in to view subscription status',
      });
    }

    const status = await getSubscriptionStatus(openId);
    
    res.json({
      ...status,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error getting subscription status:', error);
    
    res.status(500).json({
      error: 'Failed to get subscription status',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * RevenueCat webhook endpoint
 * POST /api/subscription/webhook
 * 
 * Receives subscription events from RevenueCat
 */
router.post('/webhook', async (req, res) => {
  try {
    const { event } = req.body;
    
    if (!event) {
      return res.status(400).json({
        error: 'Invalid webhook payload',
        message: 'Missing event data',
      });
    }

    const { type, app_user_id, product_id, expiration_at_ms } = event;
    
    console.log('[RevenueCat Webhook]', type, app_user_id, product_id);

    // Handle different event types
    switch (type) {
      case 'INITIAL_PURCHASE':
      case 'RENEWAL':
      case 'UNCANCELLATION':
        {
          const expiryDate = expiration_at_ms ? new Date(expiration_at_ms) : undefined;
          await syncRevenueCatSubscription(app_user_id, true, expiryDate);
        }
        break;

      case 'CANCELLATION':
      case 'EXPIRATION':
      case 'BILLING_ISSUE':
        await syncRevenueCatSubscription(app_user_id, false);
        break;

      default:
        console.log('[RevenueCat Webhook] Unhandled event type:', type);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing RevenueCat webhook:', error);
    
    res.status(500).json({
      error: 'Failed to process webhook',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Manual upgrade endpoint (for testing or admin purposes)
 * POST /api/subscription/upgrade
 */
router.post('/upgrade', async (req, res) => {
  try {
    const openId = req.headers['x-user-openid'] as string | undefined;
    
    if (!openId) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'You must be logged in to upgrade',
      });
    }

    const { revenueCatUserId, expiryDate } = req.body;

    await upgradeToPremium(
      openId,
      revenueCatUserId || `manual_${openId}`,
      expiryDate ? new Date(expiryDate) : undefined
    );

    const status = await getSubscriptionStatus(openId);
    
    res.json({
      success: true,
      subscriptionStatus: status,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error upgrading subscription:', error);
    
    res.status(500).json({
      error: 'Failed to upgrade subscription',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
