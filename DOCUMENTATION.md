# Business Case Analyzer Pro - Documentación Técnica

## Descripción General

**Business Case Analyzer Pro** es una aplicación móvil SaaS Premium para análisis financiero profesional de casos de negocio. Permite a empresarios y analistas financieros evaluar la viabilidad de proyectos mediante cálculos avanzados de ROI, NPV, TIR y análisis de escenarios.

## Características Principales

### 🌐 Sistema Multiidioma (ES/EN)
- Soporte completo para español e inglés
- Cambio dinámico de idioma sin reiniciar la app
- Persistencia de preferencia del usuario
- Traducciones completas en todos los componentes

### 💰 Motor de Cálculos Financieros
- **ROI (Return on Investment)**: Retorno de inversión porcentual
- **NPV (Net Present Value)**: Valor presente neto con tasa de descuento
- **Payback Period**: Período de recuperación de la inversión
- **IRR (Internal Rate of Return)**: Tasa interna de retorno calculada con algoritmo Newton-Raphson
- **Proyecciones de Flujo de Caja**: Cálculos mensuales con crecimiento compuesto
- **Análisis de Escenarios**: Mejor caso, caso esperado y peor caso

### 📊 Sistema de Reportes PDF
- Generación de reportes ejecutivos profesionales
- Template HTML con diseño corporativo
- Inclusión de métricas financieras clave
- Sello de validación "Validado por Business Case Analyzer Pro"
- Función de compartir vía email, WhatsApp, etc.

### 🤖 IA Narrativa para Diagnóstico
- Análisis automático de viabilidad del proyecto
- Comparación TIR vs tasa de descuento
- Identificación de riesgos y fortalezas
- Recomendaciones accionables específicas
- Fallback inteligente cuando IA no está disponible

### 🎨 Diseño Profesional
- Modo oscuro y claro automático
- Paleta de colores corporativa (azul #2563EB)
- Logo personalizado generado con IA
- Componentes reutilizables con Tailwind CSS (NativeWind)
- Animaciones suaves y feedback háptico

### 💾 Persistencia de Datos
- Almacenamiento local con AsyncStorage
- Funciones CRUD completas para proyectos
- Búsqueda y filtrado de proyectos
- Duplicación de proyectos
- Gestión de snapshots de escenarios

## Arquitectura Técnica

### Stack Tecnológico
- **Framework**: React Native con Expo SDK 54
- **Lenguaje**: TypeScript 5.9
- **Navegación**: Expo Router 6
- **Estilos**: NativeWind 4 (Tailwind CSS para React Native)
- **Estado**: React Context API + AsyncStorage
- **Gráficos**: react-native-chart-kit
- **PDF**: expo-file-system + expo-sharing
- **Backend**: Express + tRPC (opcional)

### Estructura de Carpetas

```
business-case-analyzer-pro/
├── app/                          # Pantallas y navegación
│   ├── (tabs)/                   # Tab navigation
│   │   ├── index.tsx            # Home screen
│   │   ├── projects.tsx         # Lista de proyectos
│   │   └── _layout.tsx          # Tab bar configuration
│   └── _layout.tsx              # Root layout con providers
├── components/                   # Componentes reutilizables
│   ├── business/                # Componentes de negocio
│   │   ├── metric-card.tsx      # Tarjeta de métrica
│   │   ├── project-card.tsx     # Tarjeta de proyecto
│   │   └── slider-control.tsx   # Control deslizante
│   ├── screen-container.tsx     # Contenedor con SafeArea
│   └── ui/                      # Componentes UI base
├── lib/                         # Lógica de negocio
│   ├── financial-calculator.ts  # Motor de cálculos
│   ├── project-storage.ts       # Persistencia de datos
│   ├── pdf-generator.ts         # Generación de PDF
│   ├── ai-insights.ts           # Integración con IA
│   ├── i18n-context.tsx         # Context de idioma
│   └── utils.ts                 # Utilidades
├── locales/                     # Traducciones
│   ├── es.json                  # Español
│   └── en.json                  # Inglés
├── types/                       # Tipos TypeScript
│   └── project.ts               # Tipos de proyecto
├── assets/                      # Assets estáticos
│   └── images/                  # Imágenes y logos
├── server/                      # Backend (opcional)
│   └── routes/                  # API routes
└── theme.config.js              # Configuración de tema
```

## Módulos Principales

### 1. Motor de Cálculos Financieros (`lib/financial-calculator.ts`)

```typescript
// Cálculo de métricas financieras
const results = calculateFinancialMetrics({
  initialInvestment: 100000,
  discountRate: 10,
  projectDuration: 24,
  yearlyRevenue: 50000,
  revenueGrowth: 5,
  operatingCosts: 20000,
  maintenanceCosts: 5000,
  multiplier: 1.0
});

// Resultado incluye:
// - roi: Retorno de inversión (%)
// - npv: Valor presente neto ($)
// - paybackPeriod: Período de recuperación (meses)
// - irr: Tasa interna de retorno (%)
// - monthlyCashFlow: Array de flujos mensuales
// - cumulativeCashFlow: Array de flujos acumulados
```

**Algoritmo Newton-Raphson para IRR:**
- Iteración máxima: 100
- Tolerancia: 0.0001
- Tasa inicial: 10% anual (0.83% mensual)
- Convergencia típica: 5-15 iteraciones

### 2. Persistencia de Datos (`lib/project-storage.ts`)

```typescript
// Guardar proyecto
await saveProject(project);

// Cargar todos los proyectos
const projects = await getAllProjects();

// Buscar proyectos
const results = await searchProjects('transformación');

// Filtrar por viabilidad
const viable = await filterProjectsByViability('viable');

// Duplicar proyecto
const copy = await duplicateProject(projectId);

// Eliminar proyecto
await deleteProject(projectId);
```

### 3. Generación de PDF (`lib/pdf-generator.ts`)

```typescript
// Generar reporte PDF
const filePath = await generatePDFReport({
  project: projectData,
  chartImages: {
    cashflow: 'base64_image_data',
    scenarios: 'base64_image_data'
  },
  language: 'es'
});

// Compartir reporte
await sharePDFReport(filePath);
```

### 4. IA Narrativa (`lib/ai-insights.ts`)

```typescript
// Generar insights con IA
const response = await generateAIInsights({
  project: projectData,
  results: calculationResults,
  language: 'es'
});

// Fallback sin IA
const fallback = generateFallbackInsight(
  projectData,
  calculationResults,
  'es'
);
```

### 5. Sistema de Internacionalización (`lib/i18n-context.tsx`)

```typescript
// Usar en componentes
const { t, language, setLanguage } = useTranslation();

// Traducir texto
const title = t('home.welcome'); // "Bienvenido" o "Welcome"

// Cambiar idioma
await setLanguage('en');

// Traducir con parámetros
const message = t('validations.min_value', { min: '10' });
```

## Tipos de Datos

### ProjectData
```typescript
interface ProjectData {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  
  // Información básica
  initialInvestment: number;
  discountRate: number;
  projectDuration: number;
  
  // Proyecciones de ingresos
  yearlyRevenue: number;
  revenueGrowth: number;
  
  // Costos
  operatingCosts: number;
  maintenanceCosts: number;
  
  // Análisis de escenarios
  bestCaseMultiplier: number;
  worstCaseMultiplier: number;
  
  // Resultados calculados
  results?: ProjectResults;
  
  // Snapshots de escenarios
  scenarios?: ScenarioSnapshot[];
}
```

### ProjectResults
```typescript
interface ProjectResults {
  // Caso esperado
  roi: number;
  npv: number;
  paybackPeriod: number;
  irr: number;
  
  // Mejor caso
  roiBest: number;
  npvBest: number;
  paybackBest: number;
  irrBest: number;
  
  // Peor caso
  roiWorst: number;
  npvWorst: number;
  paybackWorst: number;
  irrWorst: number;
  
  // Datos de flujo de caja
  monthlyCashFlow: number[];
  cumulativeCashFlow: number[];
  
  // Insights de IA
  aiInsights?: string;
  aiGeneratedAt?: string;
}
```

## Fórmulas Financieras

### 1. ROI (Return on Investment)
```
ROI = ((Total Revenue - Initial Investment) / Initial Investment) × 100
```

### 2. NPV (Net Present Value)
```
NPV = -I₀ + Σ(CFₜ / (1 + r)ᵗ)

Donde:
- I₀ = Inversión inicial
- CFₜ = Flujo de caja en el período t
- r = Tasa de descuento (mensual)
- t = Período (mes)
```

### 3. Payback Period
```
Período donde: Σ CFₜ ≥ I₀

Con interpolación lineal para mayor precisión
```

### 4. IRR (Internal Rate of Return)
```
Resolver para r donde: NPV = 0

Usando Newton-Raphson:
rₙ₊₁ = rₙ - f(rₙ) / f'(rₙ)

Donde:
- f(r) = NPV a la tasa r
- f'(r) = Derivada del NPV respecto a r
```

### 5. Flujo de Caja Mensual
```
CF_monthly = (Yearly Revenue × Growth Factor × Multiplier) / 12 - Monthly Costs

Growth Factor = (1 + Revenue Growth %)^year
```

## Configuración y Personalización

### Colores del Tema (`theme.config.js`)
```javascript
const themeColors = {
  primary: { light: '#2563EB', dark: '#3B82F6' },
  background: { light: '#FFFFFF', dark: '#0A0A0A' },
  surface: { light: '#F8F9FA', dark: '#1F1F1F' },
  foreground: { light: '#1A1A1A', dark: '#FFFFFF' },
  muted: { light: '#687076', dark: '#9BA1A6' },
  border: { light: '#E5E7EB', dark: '#334155' },
  success: { light: '#059669', dark: '#10B981' },
  warning: { light: '#F59E0B', dark: '#FBBF24' },
  error: { light: '#EF4444', dark: '#F87171' },
  tint: { light: '#2563EB', dark: '#3B82F6' },
};
```

### Configuración de la App (`app.config.ts`)
```typescript
const env = {
  appName: "Business Case Analyzer Pro",
  appSlug: "business-case-analyzer-pro",
  logoUrl: "https://s3.../icon.png",
  // ...
};
```

## Próximas Funcionalidades

### Módulo de Comparación de Escenarios
- Guardar snapshot de escenario base
- Sliders interactivos para ajustar variables
- Comparación visual lado a lado
- Gráficos superpuestos

### Gráficos Interactivos
- Gráfico de líneas para flujo de caja
- Gráfico de barras para comparación de ROI
- Gráfico radar para análisis de escenarios
- Animaciones suaves

### Configuración Avanzada
- Selector de idioma en Settings
- Configuración de formato PDF (A4, Letter)
- Gestión de API keys para IA
- Exportación/importación de datos

### PWA y Optimización
- Service Worker para uso offline
- Manifest.json para instalación
- Optimización de bundle
- Lazy loading de componentes

## Guía de Desarrollo

### Instalación
```bash
cd business-case-analyzer-pro
pnpm install
```

### Desarrollo
```bash
# Iniciar servidor de desarrollo
pnpm dev

# Solo Metro bundler
pnpm dev:metro

# Solo servidor backend
pnpm dev:server
```

### Testing
```bash
# Ejecutar tests
pnpm test

# Type checking
pnpm check

# Linting
pnpm lint
```

### Build
```bash
# Build para producción
pnpm build

# Generar APK
eas build --platform android

# Generar IPA
eas build --platform ios
```

## Mejores Prácticas

### 1. Componentes
- Usar `ScreenContainer` para todas las pantallas
- Aplicar feedback háptico en acciones importantes
- Mantener componentes pequeños y reutilizables

### 2. Estilos
- Usar clases de Tailwind CSS (NativeWind)
- Evitar estilos inline
- Usar tokens de color del tema

### 3. Datos
- Validar todos los inputs del usuario
- Manejar errores gracefully
- Persistir datos importantes inmediatamente

### 4. Performance
- Usar `FlatList` para listas largas
- Implementar lazy loading
- Optimizar imágenes

### 5. Accesibilidad
- Tamaños de toque mínimo 44x44
- Contraste WCAG AA
- Labels descriptivos

## Soporte y Contacto

Para soporte técnico o preguntas sobre la implementación, contacta al equipo de desarrollo.

---

**Versión**: 1.0.0  
**Última actualización**: Enero 2026  
**Licencia**: Propietaria
