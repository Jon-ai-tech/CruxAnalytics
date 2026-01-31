export interface ProjectTemplate {
  id: string;
  icon: string;
  nameKey: string; // Translation key
  descriptionKey: string; // Translation key
  category: 'tech' | 'retail' | 'manufacturing' | 'blank';
  data: {
    initialInvestment: number;
    yearlyRevenue: number;
    monthlyCosts: number;
    projectDuration: number;
    discountRate: number;
  };
}

/**
 * Predefined project templates for different industries
 * Values are based on typical industry benchmarks
 */
export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  // Blank Template
  {
    id: 'blank',
    icon: '📝',
    nameKey: 'templates.blank_name',
    descriptionKey: 'templates.blank_description',
    category: 'blank',
    data: {
      initialInvestment: 0,
      yearlyRevenue: 0,
      monthlyCosts: 0,
      projectDuration: 12,
      discountRate: 10,
    },
  },

  // SaaS Startup Template
  {
    id: 'saas_startup',
    icon: '💻',
    nameKey: 'templates.saas_name',
    descriptionKey: 'templates.saas_description',
    category: 'tech',
    data: {
      // Typical SaaS: $50K initial (dev, infrastructure, marketing)
      initialInvestment: 50000,
      // $120K ARR ($10K MRR) - realistic for early SaaS
      yearlyRevenue: 120000,
      // $5K/month (hosting, salaries, marketing, support)
      monthlyCosts: 5000,
      // 24 months to reach profitability
      projectDuration: 24,
      // Higher risk = higher discount rate
      discountRate: 15,
    },
  },

  // E-commerce Store Template
  {
    id: 'ecommerce',
    icon: '🛒',
    nameKey: 'templates.ecommerce_name',
    descriptionKey: 'templates.ecommerce_description',
    category: 'retail',
    data: {
      // Initial: inventory, website, marketing
      initialInvestment: 30000,
      // $180K/year ($15K/month revenue)
      yearlyRevenue: 180000,
      // $8K/month (COGS 60%, marketing 15%, ops 10%)
      monthlyCosts: 8000,
      // 18 months to establish brand
      projectDuration: 18,
      // Moderate risk
      discountRate: 12,
    },
  },

  // Manufacturing/Production Template
  {
    id: 'manufacturing',
    icon: '🏭',
    nameKey: 'templates.manufacturing_name',
    descriptionKey: 'templates.manufacturing_description',
    category: 'manufacturing',
    data: {
      // Heavy CAPEX: machinery, facility, tooling
      initialInvestment: 200000,
      // $400K/year production revenue
      yearlyRevenue: 400000,
      // $20K/month (raw materials, labor, utilities, maintenance)
      monthlyCosts: 20000,
      // 36 months to ROI (capital intensive)
      projectDuration: 36,
      // Lower risk, established industry
      discountRate: 10,
    },
  },

  // Mobile App Template
  {
    id: 'mobile_app',
    icon: '📱',
    nameKey: 'templates.mobile_app_name',
    descriptionKey: 'templates.mobile_app_description',
    category: 'tech',
    data: {
      // Development, design, marketing launch
      initialInvestment: 40000,
      // $90K/year (ads + IAP)
      yearlyRevenue: 90000,
      // $3.5K/month (servers, updates, marketing)
      monthlyCosts: 3500,
      // 18 months to scale user base
      projectDuration: 18,
      // High risk, competitive market
      discountRate: 18,
    },
  },

  // Restaurant/Food Service Template
  {
    id: 'restaurant',
    icon: '🍽️',
    nameKey: 'templates.restaurant_name',
    descriptionKey: 'templates.restaurant_description',
    category: 'retail',
    data: {
      // Lease, equipment, initial inventory, licenses
      initialInvestment: 100000,
      // $300K/year revenue
      yearlyRevenue: 300000,
      // $18K/month (COGS 30%, labor 30%, rent 10%, utilities 5%)
      monthlyCosts: 18000,
      // 24 months to establish reputation
      projectDuration: 24,
      // Moderate-high risk
      discountRate: 14,
    },
  },

  // Consulting/Services Template
  {
    id: 'consulting',
    icon: '💼',
    nameKey: 'templates.consulting_name',
    descriptionKey: 'templates.consulting_description',
    category: 'tech',
    data: {
      // Low initial: office setup, marketing, certifications
      initialInvestment: 15000,
      // $150K/year (2-3 consultants billing)
      yearlyRevenue: 150000,
      // $6K/month (salaries, software, marketing)
      monthlyCosts: 6000,
      // 12 months to build client base
      projectDuration: 12,
      // Low risk, service-based
      discountRate: 8,
    },
  },
];

/**
 * Get all available project templates
 */
export function getProjectTemplates(): ProjectTemplate[] {
  return PROJECT_TEMPLATES;
}

/**
 * Get a specific template by ID
 */
export function getTemplateById(id: string): ProjectTemplate | undefined {
  return PROJECT_TEMPLATES.find((template) => template.id === id);
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(
  category: ProjectTemplate['category']
): ProjectTemplate[] {
  return PROJECT_TEMPLATES.filter((template) => template.category === category);
}
