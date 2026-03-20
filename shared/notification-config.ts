/**
 * Notification configuration for CruxAnalytics.
 *
 * Daily digest is sent at 18:00 Europe/Lisbon time via WhatsApp.
 * The micro-feedback buttons (Validar / Rechazar / Ver logs) are embedded
 * in the WhatsApp message body using WhatsApp Business API template params.
 */

export const NOTIFICATION_CONFIG = {
  /** IANA timezone for all scheduled notifications */
  timezone: 'Europe/Lisbon',

  /** Local time (HH:MM) at which the daily digest is sent */
  dailyDigestTime: '18:00',

  /** Channel used for micro-feedback delivery */
  feedbackChannel: 'whatsapp' as const,

  /**
   * Returns a cron expression that fires at 18:00 Europe/Lisbon.
   * In summer (WEST = UTC+1) that is 17:00 UTC; in winter (WET = UTC+0) it is 18:00 UTC.
   * Use a timezone-aware scheduler (e.g. node-cron with timeZone option) to handle DST automatically.
   */
  get cronExpression() {
    return '0 18 * * *'; // run daily at 18:00 — interpret in `timezone` above
  },

  /**
   * WhatsApp message template for the daily digest.
   * Placeholders: {{restaurant}}, {{metric}}, {{change}}.
   */
  whatsappTemplate: {
    name: 'daily_digest_v1',
    language: 'pt_PT',
    feedbackButtons: ['✅ Validar', '❌ Rechazar', '📋 Ver logs'],
  },
} as const;

export type FeedbackChannel = typeof NOTIFICATION_CONFIG.feedbackChannel;
