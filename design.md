# Business Case Analyzer Pro - Mobile App Design

## Fecha: 11 de enero de 2026

## Orientación y Contexto
- **Orientación**: Portrait (9:16) - Diseño vertical optimizado para uso con una mano
- **Plataforma**: iOS/Android con Expo SDK 54
- **Estilo**: Aplicación financiera profesional siguiendo Apple Human Interface Guidelines (HIG)
- **Inspiración**: Aplicaciones financieras de primer nivel como Bloomberg, Robinhood (interfaz), y herramientas de análisis empresarial

---

## Pantallas Principales

### 1. **Home / Dashboard**
**Propósito**: Vista principal con acceso rápido a proyectos y métricas clave

**Contenido**:
- Header con logo y selector de idioma (ES/EN)
- Botón de modo oscuro/claro
- Tarjetas de proyectos recientes con preview de métricas (ROI, NPV)
- Botón flotante "+" para crear nuevo business case
- Navegación inferior (Tab Bar): Home, Proyectos, Comparar, Configuración

**Funcionalidad**:
- Tap en tarjeta → Navega a detalle del proyecto
- Tap en "+" → Abre formulario de nuevo proyecto
- Pull-to-refresh para actualizar datos

### 2. **Nuevo Proyecto / Formulario**
**Propósito**: Captura de datos del business case

**Contenido**:
- Formulario multi-sección con scroll vertical:
  - **Sección 1: Información Básica**
    - Nombre del proyecto (TextInput)
    - Inversión inicial ($)
    - Tasa de descuento (%)
    - Duración del proyecto (meses)
  
  - **Sección 2: Proyecciones de Ingresos**
    - Incremento de ingresos anuales ($)
    - Tasa de crecimiento de ingresos (% anual)
  
  - **Sección 3: Costos**
    - Costos operativos anuales ($)
    - Costos de mantenimiento anuales ($)
  
  - **Sección 4: Análisis de Escenarios**
    - Multiplicador mejor caso (slider 1.0 - 2.0)
    - Multiplicador peor caso (slider 0.3 - 1.0)

- Botones de acción:
  - "Calcular Análisis" (primario, azul)
  - "Guardar Borrador" (secundario)
  - "Cancelar" (terciario)

**Funcionalidad**:
- Validación en tiempo real de campos numéricos
- Auto-guardado cada 30 segundos
- Cálculo automático al completar todos los campos

### 3. **Detalle del Proyecto / Resultados**
**Propósito**: Visualización de métricas financieras y gráficos

**Contenido**:
- Header con nombre del proyecto y botón "Editar"
- **Dashboard de Métricas** (4 tarjetas en grid 2x2):
  - ROI (%) con indicador verde/rojo
  - NPV ($) con indicador de creación/destrucción de valor
  - Payback Period (meses)
  - IRR (%) con comparación vs tasa de descuento

- **Gráficos Interactivos** (tabs horizontales):
  - Tab 1: Flujo de Caja en el Tiempo (líneas)
  - Tab 2: Comparación de ROI (barras)
  - Tab 3: Análisis de Escenarios (radar)

- **Recomendaciones IA** (tarjeta expandible):
  - Diagnóstico de viabilidad en lenguaje natural
  - Análisis de riesgos
  - Recomendaciones accionables

- **Botones de Acción** (bottom sheet):
  - "Exportar PDF"
  - "Comparar Escenarios"
  - "Compartir"

**Funcionalidad**:
- Tap en métrica → Muestra explicación detallada
- Swipe entre tabs de gráficos
- Tap en "Exportar PDF" → Genera y descarga reporte
- Tap en "Comparar Escenarios" → Navega a pantalla de comparación

### 4. **Comparación de Escenarios**
**Propósito**: Comparar múltiples escenarios side-by-side con ajustes dinámicos

**Contenido**:
- Header con selector de escenarios (dropdown):
  - Escenario Base (snapshot guardado)
  - Escenario Dinámico (editable)

- **Controles Interactivos** (sliders):
  - Ventas estimadas (± 50%)
  - Costos operativos (± 50%)
  - Tasa de descuento (± 5%)

- **Visualización Comparativa** (split view):
  - Columna izquierda: Escenario Base
  - Columna derecha: Escenario Dinámico
  - Métricas clave (ROI, NPV, Payback, IRR) con diferencias porcentuales

- **Gráfico Comparativo**:
  - Gráfico de líneas superpuesto mostrando flujo de caja de ambos escenarios

- **Botones de Acción**:
  - "Guardar Escenario Dinámico como Base"
  - "Resetear a Base"
  - "Exportar Comparación"

**Funcionalidad**:
- Ajuste de sliders → Actualización en tiempo real de métricas
- Tap en "Guardar" → Crea snapshot del escenario actual
- Tap en "Exportar" → Genera PDF con comparación

### 5. **Proyectos / Lista**
**Propósito**: Gestión de todos los business cases creados

**Contenido**:
- Search bar en la parte superior
- Lista de proyectos con tarjetas:
  - Nombre del proyecto
  - Fecha de creación
  - ROI y NPV (preview)
  - Indicador de estado (verde/amarillo/rojo)

- Filtros rápidos (chips horizontales):
  - Todos
  - Viables (ROI > 0)
  - Riesgosos (ROI < 0)
  - Recientes

**Funcionalidad**:
- Tap en proyecto → Navega a detalle
- Swipe left → Opciones (Editar, Duplicar, Eliminar)
- Pull-to-refresh para actualizar lista
- Búsqueda en tiempo real

### 6. **Configuración / Settings**
**Propósito**: Preferencias de usuario y configuración de la app

**Contenido**:
- **Apariencia**:
  - Selector de tema (Sistema, Claro, Oscuro)
  - Selector de idioma (Español, English)

- **Integraciones** (Premium):
  - Conectar con OpenAI/Claude para IA narrativa
  - API Key input (oculto con toggle)

- **Exportación**:
  - Formato de PDF (A4, Letter)
  - Incluir gráficos en PDF (toggle)

- **Acerca de**:
  - Versión de la app
  - Términos y condiciones
  - Política de privacidad

**Funcionalidad**:
- Cambios se guardan automáticamente
- Validación de API keys en tiempo real

---

## Flujos de Usuario Clave

### Flujo 1: Crear y Analizar Nuevo Business Case
1. Usuario abre la app → Home screen
2. Tap en botón "+" flotante
3. Completa formulario de nuevo proyecto (scroll vertical)
4. Tap en "Calcular Análisis"
5. App procesa datos y calcula métricas (loading spinner)
6. Navega automáticamente a pantalla de Resultados
7. Usuario revisa métricas, gráficos y recomendaciones IA
8. Tap en "Exportar PDF" → Descarga reporte ejecutivo

### Flujo 2: Comparar Escenarios
1. Usuario está en pantalla de Resultados
2. Tap en "Comparar Escenarios"
3. App crea snapshot del escenario actual como "Base"
4. Navega a pantalla de Comparación
5. Usuario ajusta sliders (ventas, costos, tasa de descuento)
6. Métricas se actualizan en tiempo real
7. Usuario revisa diferencias side-by-side
8. Tap en "Guardar Escenario Dinámico como Base" (opcional)
9. Tap en "Exportar Comparación" → Genera PDF con ambos escenarios

### Flujo 3: Gestionar Proyectos Existentes
1. Usuario navega a tab "Proyectos"
2. Ve lista de todos los business cases
3. Usa search bar o filtros para encontrar proyecto específico
4. Tap en proyecto → Navega a Resultados
5. Tap en "Editar" → Vuelve a formulario con datos pre-cargados
6. Modifica valores y tap en "Calcular Análisis"
7. Revisa nuevos resultados

### Flujo 4: Configurar IA Narrativa
1. Usuario navega a tab "Configuración"
2. Scroll a sección "Integraciones"
3. Tap en "Conectar con OpenAI/Claude"
4. Ingresa API Key
5. App valida la key (loading indicator)
6. Muestra confirmación de éxito
7. Usuario vuelve a Home
8. Crea o abre un proyecto
9. Recomendaciones IA ahora muestran diagnóstico narrativo avanzado

---

## Paleta de Colores

### Light Mode
- **Primary**: #2563EB (Azul profesional)
- **Background**: #FFFFFF
- **Surface**: #F8F9FA (Tarjetas)
- **Foreground**: #1A1A1A (Texto principal)
- **Muted**: #687076 (Texto secundario)
- **Border**: #E5E7EB
- **Success**: #059669 (Verde)
- **Warning**: #F59E0B (Amarillo)
- **Error**: #EF4444 (Rojo)

### Dark Mode
- **Primary**: #3B82F6 (Azul más claro)
- **Background**: #0A0A0A
- **Surface**: #1F1F1F (Tarjetas)
- **Foreground**: #FFFFFF (Texto principal)
- **Muted**: #9BA1A6 (Texto secundario)
- **Border**: #334155
- **Success**: #10B981 (Verde más claro)
- **Warning**: #FBBF24 (Amarillo más claro)
- **Error**: #F87171 (Rojo más claro)

---

## Tipografía
- **Font Family**: System default (SF Pro en iOS, Roboto en Android)
- **Títulos**: 24-32px, Bold
- **Subtítulos**: 18-20px, Semibold
- **Cuerpo**: 14-16px, Regular
- **Captions**: 12-14px, Regular
- **Line Height**: 1.4-1.6x del font size

---

## Componentes Reutilizables

### 1. MetricCard
- Tarjeta con métrica financiera
- Icono, título, valor, indicador de estado (color)
- Tap para expandir con explicación

### 2. ChartContainer
- Contenedor para gráficos con tabs
- Soporte para Chart.js o Victory Native
- Animaciones suaves al cambiar de tab

### 3. SliderControl
- Slider con etiqueta y valor actual
- Rango personalizable
- Actualización en tiempo real

### 4. ProjectCard
- Tarjeta de proyecto en lista
- Preview de métricas clave
- Swipe actions (editar, duplicar, eliminar)

### 5. AIInsightCard
- Tarjeta expandible con recomendaciones IA
- Icono de "sparkle" para indicar IA
- Texto narrativo con formato

### 6. ExportButton
- Botón con loading state
- Icono de PDF/compartir
- Haptic feedback al tap

---

## Interacciones y Animaciones

### Transiciones de Pantalla
- Slide horizontal para navegación entre tabs
- Modal slide up para formularios y bottom sheets
- Fade para cambios de tema (oscuro/claro)

### Feedback Táctil
- Haptic light en botones primarios
- Haptic medium en toggles y switches
- Haptic success en completar acciones (guardar, exportar)

### Animaciones de Elementos
- Fade in para métricas al cargar resultados (staggered, 100ms delay)
- Scale 0.97 en press de botones
- Smooth transitions en sliders (60fps)
- Skeleton loaders para carga de datos

### Estados de Carga
- Spinner animado con mensaje contextual
- Progress bar para exportación de PDF
- Skeleton screens para listas de proyectos

---

## Consideraciones de Accesibilidad
- Tamaños de toque mínimos: 44x44 pts (iOS HIG)
- Contraste de color WCAG AA (4.5:1 para texto)
- Soporte para Dynamic Type (iOS)
- Labels descriptivos para screen readers
- Feedback visual y táctil para todas las acciones

---

## Notas de Implementación
- Usar AsyncStorage para persistencia local de proyectos
- No requiere backend/cloud sync en MVP (opcional para versión premium)
- Cálculos financieros ejecutados localmente (Newton-Raphson para IRR)
- PDF generado con react-native-html-to-pdf o @react-pdf/renderer
- Gráficos con react-native-chart-kit o Victory Native
- IA narrativa requiere API key de usuario (OpenAI/Claude)
- Multiidioma con diccionarios JSON en `/locales/`
