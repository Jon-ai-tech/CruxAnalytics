/**
 * @fileoverview XAI (Explainable AI) type definitions for CruxAnalytics
 * Provides structured types for explainable analytics and strategic insights
 */

/**
 * Strategic context providing human-readable interpretation of metrics
 */
export interface StrategicContext {
  /** Human-readable interpretation of the metric */
  interpretation: string;
  /** Actionable recommendations based on the metric value */
  recommendations: string[];
  /** Warnings for poor performance or concerning trends */
  warnings: string[];
  /** Confidence level in the analysis (0-1) */
  confidence: number;
  /** Key factors influencing this metric */
  influencingFactors: string[];
  /** Timestamp when context was generated */
  generatedAt: Date;
}

/**
 * XAI-enhanced result wrapping a value with strategic context
 * @template T The type of the underlying value
 */
export interface XAIResult<T> {
  /** The calculated value */
  value: T;
  /** Strategic context explaining the value */
  context: StrategicContext;
  /** Additional metadata about the calculation */
  metadata: {
    /** Calculation method or formula used */
    calculationMethod: string;
    /** Input parameters used in calculation */
    inputs: Record<string, unknown>;
    /** Timestamp of calculation */
    timestamp: Date;
    /** Version of the calculation algorithm */
    version: string;
  };
}

/**
 * Configuration for XAI context generation
 */
export interface XAIContextConfig {
  /** Language for generated content ('en' | 'es') */
  language?: 'en' | 'es';
  /** Include detailed technical explanations */
  includeDetailsMode?: boolean;
  /** Minimum confidence threshold for recommendations */
  confidenceThreshold?: number;
  /** Custom context templates */
  customTemplates?: Record<string, string>;
  /** Enable/disable specific context sections */
  sections?: {
    interpretation?: boolean;
    recommendations?: boolean;
    warnings?: boolean;
    influencingFactors?: boolean;
  };
}

/**
 * Result of scenario analysis with XAI context
 */
export interface XAIScenarioResult<T> {
  /** Best case scenario result */
  best: XAIResult<T>;
  /** Expected/baseline scenario result */
  expected: XAIResult<T>;
  /** Worst case scenario result */
  worst: XAIResult<T>;
  /** Comparative analysis across scenarios */
  comparison: {
    /** Key differences between scenarios */
    keyDifferences: string[];
    /** Risk assessment */
    riskAnalysis: string;
    /** Recommended scenario to pursue */
    recommendedScenario: 'best' | 'expected' | 'worst';
    /** Overall confidence in the analysis */
    overallConfidence: number;
  };
}

/**
 * Metric thresholds for determining performance levels
 */
export interface MetricThresholds {
  /** Excellent performance threshold */
  excellent: number;
  /** Good performance threshold */
  good: number;
  /** Fair performance threshold */
  fair: number;
  /** Poor performance threshold (below this is critical) */
  poor: number;
}

/**
 * Performance level categorization
 */
export type PerformanceLevel = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
