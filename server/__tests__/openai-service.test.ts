import { describe, it, expect } from 'vitest';
import { checkOpenAIStatus, generateFinancialInsights } from '../services/openai-service';

describe('OpenAI Service', () => {
  it('should connect to OpenAI API successfully', async () => {
    const status = await checkOpenAIStatus();
    
    expect(status).toBeDefined();
    expect(status.connected).toBe(true);
    expect(status.model).toBeDefined();
    expect(status.error).toBeUndefined();
  }, 30000); // 30 second timeout for API call

  it('should generate financial insights', async () => {
    const prompt = `Analiza este proyecto:
    - Inversión inicial: $100,000
    - ROI: 45%
    - NPV: $85,000
    - TIR: 22%
    - Payback: 18 meses`;

    const insights = await generateFinancialInsights(prompt, 'es');
    
    expect(insights).toBeDefined();
    expect(typeof insights).toBe('string');
    expect(insights.length).toBeGreaterThan(50);
  }, 30000); // 30 second timeout for API call
});
