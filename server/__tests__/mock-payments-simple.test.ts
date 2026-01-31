import { describe, it, expect } from 'vitest';

describe('Mock Payments Configuration', () => {
  it('should have EXPO_PUBLIC_USE_MOCK_PAYMENTS set to true', () => {
    const useMock = process.env.EXPO_PUBLIC_USE_MOCK_PAYMENTS === 'true';
    expect(useMock).toBe(true);
  });

  it('should validate environment variable is accessible', () => {
    expect(process.env.EXPO_PUBLIC_USE_MOCK_PAYMENTS).toBeDefined();
    expect(process.env.EXPO_PUBLIC_USE_MOCK_PAYMENTS).toBe('true');
  });
});
