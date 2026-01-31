export interface ProjectData {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  
  // Basic Information
  initialInvestment: number;
  discountRate: number;
  projectDuration: number; // in months
  
  // Revenue Projections
  yearlyRevenue: number;
  revenueGrowth: number; // percentage
  
  // Costs
  operatingCosts: number;
  maintenanceCosts: number;
  
  // Scenario Analysis
  bestCaseMultiplier: number;
  worstCaseMultiplier: number;
  
  // Calculated Results
  results?: ProjectResults;
  
  // Scenarios
  scenarios?: ScenarioSnapshot[];
}

export interface ProjectResults {
  // Expected Case
  roi: number;
  npv: number;
  paybackPeriod: number;
  irr: number;
  
  // Best Case
  roiBest: number;
  npvBest: number;
  paybackBest: number;
  irrBest: number;
  
  // Worst Case
  roiWorst: number;
  npvWorst: number;
  paybackWorst: number;
  irrWorst: number;
  
  // Cash Flow Data
  monthlyCashFlow: number[];
  cumulativeCashFlow: number[];
  
  // AI Insights
  aiInsights?: string;
  aiGeneratedAt?: string;
}

export interface ScenarioSnapshot {
  id: string;
  name: string;
  createdAt: string;
  isBase: boolean;
  
  // Adjustments (percentage changes from original)
  salesAdjustment: number; // -50 to +50
  costsAdjustment: number; // -50 to +50
  discountAdjustment: number; // -5 to +5
  
  // Calculated Results for this scenario
  results: {
    roi: number;
    npv: number;
    paybackPeriod: number;
    irr: number;
    monthlyCashFlow: number[];
    cumulativeCashFlow: number[];
  };
}

export interface ComparisonData {
  baseScenario: ScenarioSnapshot;
  dynamicScenario: ScenarioSnapshot;
  differences: {
    roiDiff: number;
    npvDiff: number;
    paybackDiff: number;
    irrDiff: number;
  };
}

export interface FinancialCalculationInput {
  initialInvestment: number;
  discountRate: number;
  projectDuration: number;
  yearlyRevenue: number;
  revenueGrowth: number;
  operatingCosts: number;
  maintenanceCosts: number;
  multiplier?: number; // For scenario analysis
}

export interface FinancialCalculationResult {
  roi: number;
  npv: number;
  paybackPeriod: number;
  irr: number;
  monthlyCashFlow: number[];
  cumulativeCashFlow: number[];
}

export interface CashFlowData {
  month: number;
  netCashFlow: number;
  cumulativeCashFlow: number;
}
