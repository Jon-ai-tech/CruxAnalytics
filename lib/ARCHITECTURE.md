# CruxAnalytics Modular Architecture

This document describes the modular architecture of CruxAnalytics, organized into distinct layers for maintainability, testability, and extensibility.

## Architecture Overview

```
lib/
├── xai/                    # Explainable AI Layer
├── business-logic/         # Business Intelligence & Financial Calculations
├── validation/             # Input Validation Layer
└── data-access/           # Data Persistence & Logging
```

## Layer Descriptions

### 1. XAI Layer (`lib/xai/`)

Provides explainable AI capabilities, generating human-readable context and strategic insights for all metrics.

**Files:**
- `types.ts` - Type definitions for XAI results and contexts
- `context-generator.ts` - Strategic context generation logic
- `index.ts` - Public API exports

**Key Types:**
- `XAIResult<T>` - Wraps any value with strategic context
- `StrategicContext` - Human-readable interpretation, recommendations, warnings
- `XAIScenarioResult` - Scenario comparison analysis
- `XAIContextConfig` - Configuration (language, detail level)

**Features:**
- Multi-language support (English, Spanish)
- Confidence scoring (0-1)
- Performance level categorization
- Actionable recommendations
- Risk warnings

**Example:**
```typescript
import { generateOperationalFrictionContext } from '@/lib/xai';

const context = generateOperationalFrictionContext(45, {
  repetitiveHours: 40,
  totalHours: 160,
  frictionMultiplier: 1.5
}, { language: 'en' });

console.log(context.interpretation);
console.log(context.recommendations);
console.log(context.confidence);
```

---

### 2. Business Logic Layer (`lib/business-logic/`)

Implements core business intelligence metrics and financial calculations with XAI integration.

**Files:**
- `business-intelligence.ts` - OFI, TFDI, SER metrics
- `financial-core.ts` - ROI, NPV, IRR, Payback calculations
- `index.ts` - Unified BusinessIntelligence facade

#### Business Intelligence Metrics

**OFI (Operational Friction Index)**
```typescript
const result = await calculateOFI(
  repetitiveHours: 40,
  totalHours: 160,
  frictionMultiplier: 1.5
);
// Formula: (repetitiveHours / totalHours) × 100 × frictionMultiplier
```

**TFDI (Tech-Debt Financial Impact)**
```typescript
const result = await calculateTFDI(
  manualHoursPerMonth: 100,
  manualHourlyRate: 50,
  automationCost: 10000,
  timeHorizonMonths: 12
);
// Compares manual cost vs automation cost over time
```

**SER (Sustainability Efficiency Ratio)**
```typescript
const result = await calculateSER(
  efficiencyGain: 50,
  lifetime: 24,
  frictionCost: 5000,
  investment: 10000
);
// Formula: (efficiencyGain × lifetime) / (frictionCost + investment)
```

#### Financial Calculations

Uses **Strategy Pattern** for extensibility:
- `ROIStrategy` - Return on Investment
- `NPVStrategy` - Net Present Value
- `IRRStrategy` - Internal Rate of Return
- `PaybackStrategy` - Payback Period

**Example:**
```typescript
import { businessIntelligence } from '@/lib/business-logic';

const metrics = await businessIntelligence.calculateFinancials({
  investment: 10000,
  savings: 3000,
  discountRate: 0.1,
  timeHorizon: 5
});

console.log(metrics.roi.value); // { name: 'ROI', value: 50, unit: '%' }
console.log(metrics.roi.context.recommendations);
```

#### Comprehensive Insights

```typescript
const insights = await businessIntelligence.getComprehensiveInsights(
  financialInputs,
  businessIntelligenceInputs
);

console.log(insights.executiveSummary.overallScore);
console.log(insights.executiveSummary.topRecommendations);
console.log(insights.executiveSummary.criticalWarnings);
```

---

### 3. Validation Layer (`lib/validation/`)

Provides type-safe input validation using Zod.

**Files:**
- `input-validator.ts` - Validation functions and schemas

**Functions:**
- `validateNumber(value, min, max)` - Range validation
- `validatePercentage(value)` - 0-100 validation
- `validatePositiveNumber(value)` - > 0 validation
- `validateNonNegativeNumber(value)` - >= 0 validation
- `sanitizeString(input)` - XSS prevention
- `assertRange(value, min, max)` - Custom range assertion

**Schemas:**
- `financialInputSchema` - Financial calculation inputs
- `businessIntelligenceInputSchema` - BI metric inputs

**Example:**
```typescript
import { validatePercentage, financialInputSchema } from '@/lib/validation/input-validator';

validatePercentage(75); // ✓ passes
validatePercentage(150); // ✗ throws Error

const inputs = financialInputSchema.parse({
  investment: 10000,
  savings: 3000,
  discountRate: 10,
  timeHorizon: 5
});
```

---

### 4. Data Access Layer (`lib/data-access/`)

Implements Repository pattern and structured logging.

**Files:**
- `repository.ts` - Repository pattern implementation
- `logging.ts` - Structured logging system
- `index.ts` - Public API exports

#### Repository Pattern

**Interfaces:**
- `Repository<T>` - CRUD operations interface
- `Entity` - Base entity with id, createdAt, updatedAt
- `QueryOptions<T>` - Query filters, sorting, pagination

**Classes:**
- `BaseRepository<T>` - Abstract repository implementation
- `InMemoryRepository<T>` - In-memory implementation
- `RepositoryFactory` - Repository registry
- `UnitOfWork` - Transaction management

**Example:**
```typescript
import { InMemoryRepository } from '@/lib/data-access';

interface Project {
  id: number;
  name: string;
  value: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const repo = new InMemoryRepository<Project>();

const project = await repo.create({ name: 'Project 1', value: 100 });
const found = await repo.findById(project.id);
const updated = await repo.update(project.id, { value: 200 });
const all = await repo.find({ 
  where: { name: 'Project 1' },
  orderBy: [{ field: 'value', direction: 'desc' }],
  skip: 0,
  take: 10
});
```

#### Structured Logging

**Classes:**
- `Logger` - Main logger class
- `LoggerFactory` - Logger management
- `ConsoleLogOutput` - Console output (colored)
- `MemoryLogOutput` - In-memory output (testing)

**Log Levels:**
- DEBUG (0)
- INFO (1)
- WARN (2)
- ERROR (3)
- CRITICAL (4)

**Example:**
```typescript
import { LoggerFactory, LogLevel } from '@/lib/data-access';

const logger = LoggerFactory.getLogger('my-module');

await logger.info('Operation started', { userId: '123' });
await logger.error('Operation failed', error, { userId: '123' });
await logger.audit('user123', 'create', 'project', 'success', {
  projectId: 'proj-123'
});
```

---

## Design Patterns Used

1. **Strategy Pattern** - Financial calculations (ROI, NPV, IRR, Payback)
2. **Factory Pattern** - RepositoryFactory, LoggerFactory, FinancialCalculatorFactory
3. **Repository Pattern** - Data access abstraction
4. **Unit of Work Pattern** - Transaction management
5. **Facade Pattern** - BusinessIntelligence unified API
6. **Decorator Pattern** - XAI wrapping of results

---

## Testing

Tests are located in `tests/architecture.test.ts` and cover:

- ✅ Validation layer
- ✅ Business intelligence metrics (OFI, TFDI, SER)
- ✅ Financial calculations (ROI, NPV, IRR, Payback)
- ✅ XAI context generation
- ✅ Structured logging
- ✅ Repository CRUD operations
- ✅ Business Intelligence facade

**Run tests:**
```bash
npm test tests/architecture.test.ts
```

---

## Extensibility

### Adding a Custom Financial Strategy

```typescript
import { FinancialStrategy, businessIntelligence } from '@/lib/business-logic';

class CustomMetricStrategy implements FinancialStrategy {
  getName() { return 'CustomMetric'; }
  
  async calculate(inputs) {
    return {
      name: 'CustomMetric',
      value: /* your calculation */,
      unit: '%'
    };
  }
}

businessIntelligence.registerCustomStrategy(new CustomMetricStrategy());
```

### Creating a Custom Repository

```typescript
import { BaseRepository } from '@/lib/data-access';

class MyRepository extends BaseRepository<MyEntity> {
  protected generateId(): string {
    return `entity-${Date.now()}`;
  }
  
  // Add custom methods
  async findByCustomField(field: string) {
    return this.find({ where: { customField: field } });
  }
}
```

### Adding Log Outputs

```typescript
import { LogOutput, Logger } from '@/lib/data-access';

class DatabaseLogOutput implements LogOutput {
  async write(entry) {
    await db.logs.create(entry);
  }
}

const logger = new Logger('my-logger', {
  outputs: [new ConsoleLogOutput(), new DatabaseLogOutput()]
});
```

---

## Best Practices

1. **Always validate inputs** using validation layer
2. **Use XAI results** for user-facing metrics
3. **Leverage the facade** (businessIntelligence) for unified API
4. **Log all important operations** with structured logging
5. **Use repositories** for data persistence abstraction
6. **Add custom strategies** instead of modifying existing code
7. **Write tests** for all new business logic

---

## Type Safety

All modules are fully typed with TypeScript:
- ✅ Strict null checks
- ✅ Discriminated unions
- ✅ Generic types
- ✅ Branded types where appropriate
- ✅ Comprehensive JSDoc comments

---

## Dependencies

- **Zod** - Runtime type validation
- **TypeScript** - Type safety

No additional dependencies required for the core architecture.

---

## Migration Guide

### Before (Old Code)
```typescript
const roi = ((savings * timeHorizon) - investment) / investment * 100;
console.log('ROI:', roi);
```

### After (New Architecture)
```typescript
import { businessIntelligence } from '@/lib/business-logic';

const result = await businessIntelligence.calculateFinancials({
  investment,
  savings,
  discountRate: 0.1,
  timeHorizon
});

console.log('ROI:', result.roi.value.value);
console.log('Recommendations:', result.roi.context.recommendations);
console.log('Confidence:', result.roi.context.confidence);
```

---

## Performance Considerations

- All metric calculations use **parallel execution** where possible
- Repository queries are **O(n)** for in-memory implementation
- Logging is **async** to avoid blocking
- XAI context generation is **cached** within results

---

## Future Enhancements

- [ ] Database-backed repository implementations
- [ ] Remote logging outputs (Sentry, DataDog)
- [ ] Caching layer for expensive calculations
- [ ] Real-time metric streaming
- [ ] Machine learning model integration
- [ ] Multi-tenant data isolation

---

## Support

For questions or issues related to the architecture:
1. Check the code documentation (JSDoc comments)
2. Review the test files for usage examples
3. Consult this README for design patterns

---

**Last Updated:** 2024
**Architecture Version:** 1.0.0
