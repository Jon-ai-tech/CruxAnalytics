import OpenAI from 'openai';

/**
 * OpenAI Service - Independent AI Integration
 * 
 * This service provides direct integration with OpenAI API,
 * giving full control over model selection, prompts, and costs.
 */

// Initialize OpenAI client with API key from environment
// Force explicit baseURL to avoid any environment interference
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: 'https://api.openai.com/v1', // Explicit OpenAI URL
  dangerouslyAllowBrowser: false,
});

/**
 * System prompt for the Financial Analyst AI
 * Defines the personality and expertise of the AI assistant
 */
const FINANCIAL_ANALYST_SYSTEM_PROMPT = `Eres un analista financiero senior especializado en evaluación de proyectos empresariales y business cases. Tu experiencia incluye:

- Análisis de ROI, NPV, TIR y métricas financieras avanzadas
- Evaluación de riesgos y viabilidad de proyectos
- Recomendaciones estratégicas basadas en datos
- Identificación de factores críticos de éxito y fracaso

Tu tarea es analizar los resultados financieros de un proyecto y proporcionar:
1. Un diagnóstico claro de viabilidad (Viable, Revisar, No Viable)
2. Análisis de fortalezas y debilidades
3. Recomendaciones accionables y específicas
4. Identificación de riesgos potenciales

Sé conciso, profesional y enfócate en insights prácticos que el usuario pueda implementar.`;

/**
 * Generate AI insights for business case analysis
 */
export async function generateFinancialInsights(
  prompt: string,
  language: 'es' | 'en' = 'es',
  customSystemPrompt?: string
): Promise<string> {
  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured. Please add it to your environment variables.');
    }

    // Translate system prompt if needed
    const systemPrompt = customSystemPrompt || (
      language === 'en' 
        ? FINANCIAL_ANALYST_SYSTEM_PROMPT.replace(/eres/gi, 'you are').replace(/tu tarea/gi, 'your task')
        : FINANCIAL_ANALYST_SYSTEM_PROMPT
    );

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini', // Default to GPT-4o-mini for cost efficiency
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error('No response from OpenAI');
    }

    return response;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    
    // Provide helpful error messages
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('OpenAI API key is missing or invalid. Please configure OPENAI_API_KEY in your environment.');
      }
      if (error.message.includes('quota')) {
        throw new Error('OpenAI API quota exceeded. Please check your OpenAI account billing.');
      }
      throw error;
    }
    
    throw new Error('Failed to generate AI insights');
  }
}

/**
 * Check OpenAI API connection status
 */
export async function checkOpenAIStatus(): Promise<{
  connected: boolean;
  model: string;
  error?: string;
}> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return {
        connected: false,
        model: 'none',
        error: 'OPENAI_API_KEY not configured',
      };
    }

    // Test connection with a minimal request
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: 'test',
        },
      ],
      max_tokens: 5,
    });

    return {
      connected: true,
      model: completion.model,
    };
  } catch (error) {
    return {
      connected: false,
      model: 'none',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get available OpenAI models
 */
export function getAvailableModels(): string[] {
  return [
    'gpt-4o',           // Latest GPT-4 Turbo
    'gpt-4o-mini',      // Cost-effective GPT-4
    'gpt-4-turbo',      // Previous GPT-4 Turbo
    'gpt-3.5-turbo',    // Fast and cheap
  ];
}
