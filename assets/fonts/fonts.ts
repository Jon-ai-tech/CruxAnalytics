/**
 * @fileoverview Font loading configuration for Vanguard Crux Typography
 * Inter: Headlines and emphasis
 * Satoshi: Body text and UI elements
 */

export const fonts = {
  'Inter-Bold': require('./Inter-Bold.ttf'),
  'Inter-SemiBold': require('./Inter-SemiBold.ttf'),
  'Inter-Medium': require('./Inter-Medium.ttf'),
  'Inter-Regular': require('./Inter-Regular.ttf'),
  'Satoshi-Bold': require('./Satoshi-Bold.ttf'),
  'Satoshi-Medium': require('./Satoshi-Medium.ttf'),
  'Satoshi-Regular': require('./Satoshi-Regular.ttf'),
};

export type FontName = keyof typeof fonts;
