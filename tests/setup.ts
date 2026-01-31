import { beforeAll } from 'vitest';

/**
 * Test environment setup
 * Sets default environment variables for tests
 */
beforeAll(() => {
  // Mock payments configuration
  process.env.EXPO_PUBLIC_USE_MOCK_PAYMENTS = 'true';
  
  // Test environment
  process.env.NODE_ENV = 'test';
  
  // Suppress API key warnings in test output
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    const message = args[0]?.toString() || '';
    if (message.includes('OPENAI_API_KEY') || message.includes('API key')) {
      return; // Suppress API key warnings
    }
    originalWarn(...args);
  };
});
