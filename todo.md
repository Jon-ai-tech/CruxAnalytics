# Business Case Analyzer Pro - TODO

## Core Features

### Sistema Multiidioma (ES/EN)
- [x] Crear estructura de carpetas /locales con es.json y en.json
- [x] Implementar Context API para gestión de idioma
- [x] Crear hook useTranslation() para acceder a traducciones
- [x] Traducir todas las cadenas de texto de la interfaz
- [x] Agregar selector de idioma en Settings
- [x] Persistir preferencia de idioma en AsyncStorage

### Módulo de Comparación de Escenarios
- [ ] Crear pantalla de comparación de escenarios
- [ ] Implementar función de snapshot para guardar escenario base
- [ ] Crear sliders interactivos para variables críticas (ventas, costos, tasa descuento)
- [ ] Implementar actualización en tiempo real de métricas al ajustar sliders
- [ ] Crear visualización side-by-side de escenarios
- [ ] Implementar gráfico comparativo superpuesto
- [ ] Agregar botón "Guardar Escenario Dinámico como Base"
- [ ] Agregar botón "Resetear a Base"
- [ ] Implementar exportación de comparación a PDF

### Sistema de Reportes Profesionales en PDF
- [x] Instalar y configurar react-native-html-to-pdf o @react-pdf/renderer
- [x] Diseñar template de PDF profesional
- [x] Implementar captura de gráficos como imágenes (react-native-view-shot)
- [x] Crear función de generación de PDF con resumen ejecutivo
- [x] Agregar sello "Validado por Business Case Analyzer Pro"
- [x] Incluir métricas clave (ROI, NPV, TIR, Payback)
- [x] Incluir gráficos de flujo de caja
- [x] Implementar descarga y compartir PDF
- [ ] Agregar opción de formato (A4, Letter) en Settings

### IA Narrativa para Diagnóstico de Viabilidad
- [x] Crear módulo de conexión a API de OpenAI/Claude
- [ ] Implementar input de API Key en Settings
- [ ] Validar API Key en tiempo real
- [x] Crear función para enviar resultados financieros a IA
- [x] Implementar parsing de respuesta de IA
- [ ] Crear componente AIInsightCard para mostrar diagnóstico
- [x] Implementar análisis de riesgos basado en variabilidad
- [x] Agregar recomendaciones accionables
- [x] Implementar comparación TIR vs tasa de descuento
- [ ] Persistir configuración de API en AsyncStorage (encriptado)

### Modo Oscuro/Claro Profesional
- [ ] Configurar paletas de colores en theme.config.js
- [ ] Implementar detección de preferencia del sistema (useColorScheme)
- [ ] Crear selector manual de tema en Settings
- [ ] Aplicar tema dinámicamente en todos los componentes
- [ ] Asegurar contraste WCAG AA en ambos modos
- [ ] Implementar transiciones suaves entre modos
- [ ] Persistir preferencia de tema en AsyncStorage

## Pantallas y Navegación

### Home / Dashboard
- [ ] Crear pantalla Home con ScreenContainer
- [ ] Implementar header con logo y selector de idioma
- [ ] Agregar botón de modo oscuro/claro
- [ ] Crear componente ProjectCard para proyectos recientes
- [ ] Implementar botón flotante "+" para nuevo proyecto
- [ ] Configurar Tab Bar con 4 tabs (Home, Proyectos, Comparar, Settings)
- [ ] Implementar pull-to-refresh

### Formulario de Nuevo Proyecto
- [ ] Crear pantalla de formulario con scroll vertical
- [ ] Implementar sección de Información Básica
- [ ] Implementar sección de Proyecciones de Ingresos
- [ ] Implementar sección de Costos
- [ ] Implementar sección de Análisis de Escenarios con sliders
- [ ] Agregar validación en tiempo real de campos numéricos
- [ ] Implementar auto-guardado cada 30 segundos
- [ ] Agregar botones "Calcular Análisis", "Guardar Borrador", "Cancelar"
- [ ] Implementar navegación a pantalla de Resultados

### Pantalla de Resultados
- [ ] Crear pantalla de detalle con ScreenContainer
- [ ] Implementar dashboard de métricas (4 tarjetas en grid 2x2)
- [ ] Crear componente MetricCard reutilizable
- [ ] Implementar tabs para gráficos (Flujo de Caja, ROI, Escenarios)
- [ ] Integrar librería de gráficos (react-native-chart-kit o Victory Native)
- [ ] Crear gráfico de flujo de caja (líneas)
- [ ] Crear gráfico de comparación de ROI (barras)
- [ ] Crear gráfico de análisis de escenarios (radar)
- [ ] Implementar tarjeta de Recomendaciones IA (expandible)
- [ ] Agregar bottom sheet con botones de acción
- [ ] Implementar botón "Editar" en header

### Pantalla de Lista de Proyectos
- [ ] Crear pantalla de lista con ScreenContainer
- [ ] Implementar search bar en la parte superior
- [ ] Crear lista de proyectos con FlatList
- [ ] Implementar filtros rápidos (chips horizontales)
- [ ] Agregar swipe actions (Editar, Duplicar, Eliminar)
- [ ] Implementar búsqueda en tiempo real
- [ ] Agregar pull-to-refresh

### Pantalla de Configuración
- [ ] Crear pantalla de Settings con ScreenContainer
- [ ] Implementar sección de Apariencia (tema, idioma)
- [ ] Implementar sección de Integraciones (API keys)
- [ ] Implementar sección de Exportación (formato PDF)
- [ ] Implementar sección Acerca de (versión, términos, privacidad)
- [ ] Agregar validación de API keys

### Lógica de Negocio y Cálculos

### Motor de Cálculos Financieros
- [x] Implementar cálculo de ROI
- [x] Implementar cálculo de NPV (Valor Presente Neto)
- [x] Implementar cálculo de Payback Period
- [x] Implementar cálculo de IRR (Tasa Interna de Retorno) con Newton-Raphson
- [x] Implementar proyecciones de flujo de caja mensual
- [x] Implementar análisis de escenarios (mejor, esperado, peor caso)
- [x] Crear módulo de validación de datos de entrada
- [x] Implementar manejo de errores en cálculos

### Persistencia de Datos
- [x] Configurar AsyncStorage para almacenamiento local
- [x] Crear funciones de guardado de proyectos
- [x] Crear funciones de carga de proyectos
- [x] Implementar función de eliminación de proyectos
- [x] Implementar función de duplicación de proyectos
- [ ] Crear sistema de auto-guardado
- [ ] Implementar migración de datos si cambia estructura
## Gráficos y Visualización

### Implementación de Gráficos
- [ ] Instalar react-native-chart-kit o Victory Native
- [ ] Configurar colores corporativos en gráficos
- [ ] Implementar gráfico de líneas para flujo de caja
- [ ] Implementar gráfico de barras para comparación de ROI
- [ ] Implementar gráfico radar para análisis de escenarios
- [ ] Agregar animaciones suaves a gráficos
- [ ] Implementar interactividad (tap para detalles)
- [ ] Optimizar rendimiento de gráficos

## UX y Animaciones

### Interacciones y Feedback
- [ ] Implementar haptic feedback en botones primarios
- [ ] Agregar animaciones de scale en press (0.97)
- [ ] Implementar fade in staggered para métricas
- [ ] Crear skeleton loaders para listas
- [ ] Implementar loading spinners con mensajes contextuales
- [ ] Agregar progress bar para exportación de PDF
- [ ] Implementar transiciones suaves entre pantallas

### Componentes Reutilizables
- [x] Crear componente MetricCard
- [ ] Crear componente ChartContainer
- [x] Crear componente SliderControl
- [x] Crear componente ProjectCard
- [ ] Crear componente AIInsightCard
- [ ] Crear componente ExportButton
- [ ] Crear componente LanguageSelector
- [ ] Crear componente ThemeToggle
### Branding y Assets

### Logo y Branding
- [x] Generar logo personalizado con IA (square, iconic design)
- [x] Guardar logo en assets/images/icon.png
- [x] Copiar logo a splash-icon.png
- [x] Copiar logo a favicon.png
- [x] Copiar logo a android-icon-foreground.png
- [x] Actualizar app.config.ts con nombre y branding
- [x] Subir logo a S3 y actualizar logoUrl en app.config.ts

### Configuración de App
- [ ] Actualizar nombre de la app en app.config.ts
- [ ] Configurar colores de splash screen
- [ ] Configurar colores de status bar
- [ ] Verificar bundle identifiers

## Testing y Validación

### Testing Funcional
- [ ] Probar flujo completo de creación de proyecto
- [ ] Probar cálculos financieros con casos de prueba
- [ ] Probar comparación de escenarios
- [ ] Probar exportación de PDF
- [ ] Probar integración con IA (con API key válida)
- [ ] Probar cambio de idioma
- [ ] Probar cambio de tema oscuro/claro
- [ ] Probar persistencia de datos (cerrar y reabrir app)

### Testing de UX
- [ ] Verificar que todos los botones funcionan
- [ ] Verificar feedback visual en todas las interacciones
- [ ] Verificar que no hay dead ends en navegación
- [ ] Verificar tiempos de carga aceptables
- [ ] Verificar que gráficos se renderizan correctamente
- [ ] Verificar que PDF se genera correctamente

## Documentación

### Documentación Técnica
- [ ] Actualizar README.md con instrucciones de uso
- [ ] Documentar estructura de datos de proyectos
- [ ] Documentar API de IA narrativa
- [ ] Documentar fórmulas de cálculos financieros
- [ ] Crear guía de contribución

### Documentación de Usuario
- [ ] Crear tutorial de onboarding (opcional)
- [ ] Crear guía de uso de comparación de escenarios
- [ ] Crear guía de configuración de IA
- [ ] Crear FAQ

## Optimización y Pulido

### Optimización de Rendimiento
- [ ] Optimizar renderizado de listas con FlatList
- [ ] Implementar lazy loading de gráficos
- [ ] Optimizar tamaño de bundle
- [ ] Reducir tiempo de carga inicial
- [ ] Optimizar uso de memoria

### Pulido Final
- [ ] Revisar consistencia de estilos
- [ ] Revisar consistencia de traducciones
- [ ] Revisar accesibilidad (tamaños de toque, contraste)
- [ ] Revisar manejo de errores
- [ ] Revisar mensajes de usuario

## Entrega Final

### Preparación para Entrega
- [ ] Crear checkpoint final
- [ ] Generar APK de producción
- [ ] Probar APK en dispositivo físico
- [ ] Crear documentación de entrega
- [ ] Preparar demo para usuario


## Bug Fixes

### Bundle ID con palabra reservada de Java
- [x] Corregir bundle ID que contiene "case" (palabra reservada de Java)
- [x] Actualizar app.config.ts con nuevo bundle ID válido
- [x] Verificar que el nuevo bundle ID no contenga palabras reservadas
- [ ] Probar compilación de Android


### Problemas de Publicación del Backend
- [x] Diagnosticar error de publicación del backend
- [x] Verificar configuración del servidor
- [x] Corregir problemas de build o deployment (removido dist/ de .gitignore)
- [x] Rebuild del servidor completado
- [ ] Probar publicación exitosa


## Funcionalidades Faltantes para App Funcional

### Selector de Idioma Visible
- [x] Crear componente LanguageSelector con botones ES/EN
- [x] Agregar selector en la pantalla Home
- [ ] Agregar selector en Settings (si existe)
- [x] Probar cambio de idioma en tiempo real

### Formulario de Creación de Proyectos
- [x] Crear pantalla de formulario (new-project.tsx)
- [x] Implementar campos de entrada con validación
- [x] Agregar navegación desde botón FAB en Home
- [x] Implementar guardado de proyecto
- [x] Mostrar confirmación al guardar

### Pantalla de Resultados
- [x] Crear pantalla de resultados (project-details.tsx)
- [x] Mostrar métricas calculadas (ROI, NPV, TIR, Payback)
- [ ] Implementar gráficos de flujo de caja
- [x] Agregar botón de exportar PDF
- [ ] Agregar análisis de IA

### Navegación Completa
- [x] Configurar navegación entre Home → Formulario
- [x] Configurar navegación Formulario → Resultados
- [x] Configurar navegación desde lista de proyectos → Detalles
- [x] Agregar botones de navegación apropiados


## Gráficos Interactivos de Flujo de Caja

### Implementación de react-native-chart-kit
- [x] Instalar react-native-chart-kit y dependencias
- [x] Crear componente CashFlowChart
- [x] Implementar gráfico de flujo de caja mensual (barras)
- [x] Implementar gráfico de flujo de caja acumulado (líneas)
- [x] Agregar tabs o selector para alternar entre gráficos
- [x] Integrar gráficos en pantalla de resultados
- [x] Agregar leyendas y etiquetas
- [x] Optimizar para tema oscuro/claro
- [ ] Probar en dispositivo móvil


## Módulo de Comparación Dinámica de Escenarios

### Componentes y Pantalla
- [x] Instalar @react-native-community/slider
- [x] Crear componente ScenarioSlider reutilizable
- [x] Crear pantalla de comparación (compare/[id].tsx)
- [x] Agregar botón de comparación en pantalla de resultados

### Funcionalidad de Sliders
- [x] Slider de ajuste de ventas (-50% a +50%)
- [x] Slider de ajuste de costos (-50% a +50%)
- [x] Slider de ajuste de tasa de descuento (-5% a +5%)
- [x] Mostrar valores actuales en tiempo real
- [x] Implementar reset a valores base

### Cálculos Dinámicos
- [x] Recalcular métricas en tiempo real al mover sliders
- [x] Mantener escenario base como referencia
- [x] Calcular diferencias entre escenarios
- [x] Optimizar rendimiento con useMemo

### Visualización Comparativa
- [x] Mostrar métricas base vs dinámicas side-by-side
- [x] Indicadores visuales de diferencias (+ / -)
- [x] Colores para mejora/empeoramiento
- [ ] Gráficos comparativos de flujo de caja
- [ ] Botón para guardar snapshot del escenario


## Sección de Diagnóstico por IA

### Componente AIInsightCard
- [x] Crear componente AIInsightCard
- [x] Diseño con ícono de IA/estrella
- [x] Mostrar análisis narrativo
- [x] Mostrar recomendaciones en lista
- [x] Estados de carga, error y éxito

### Integración con Backend
- [x] Llamar endpoint /api/ai/insights desde pantalla de resultados
- [x] Enviar métricas del proyecto al backend
- [x] Parsear respuesta de IA
- [x] Auto-generar análisis al cargar proyecto
- [x] Agregar botón de "Regenerar análisis"

### UX y Feedback
- [x] Indicador de carga mientras se genera análisis
- [x] Mensaje de error si falla la llamada
- [x] Botón de retry en caso de error
- [x] Formato legible del texto narrativo
- [x] Traducciones ES/EN completas


## Pantalla de Configuración (Settings)

### Estructura y Diseño
- [x] Crear pantalla /app/(tabs)/settings.tsx
- [x] Agregar tab de Settings en navegación
- [x] Diseño con secciones agrupadas
- [x] Iconos para cada opción

### Selector de Idioma
- [x] Componente de selector ES/EN
- [x] Banderas o íconos de idioma
- [x] Persistir selección en AsyncStorage (ya implementado en i18n-context)
- [x] Actualizar contexto de i18n al cambiar

### Toggle de Tema
- [x] Selector para tema oscuro/claro/automático
- [x] Persistir preferencia en AsyncStorage
- [ ] Integrar con ThemeProvider (requiere actualización del provider)
- [x] Opción "Automático" (seguir sistema)

### Sección Acerca de
- [x] Mostrar nombre y versión de la app
- [x] Logo de la aplicación
- [x] Descripción breve
- [x] Enlaces a términos y privacidad
- [x] Información de contacto/soporte

### Opciones Adicionales
- [x] Botón para limpiar caché
- [ ] Opción de formato PDF (A4/Letter)
- [x] Traducciones completas ES/EN


## Funcionalidad de Edición de Proyectos

### Pantalla de Edición
- [x] Crear pantalla /edit-project/[id].tsx
- [x] Formulario pre-poblado con datos actuales
- [x] Validación de campos en tiempo real
- [x] Botón de guardar cambios
- [x] Botón de cancelar

### Lógica de Actualización
- [x] Función updateProject en project-storage.ts
- [x] Recálculo automático de métricas al guardar
- [x] Actualizar proyecto en AsyncStorage
- [x] Navegación de regreso a pantalla de resultados

### Integración con UI
- [x] Botón "Editar" en pantalla de resultados
- [x] Navegación a pantalla de edición con ID
- [x] Confirmación de cambios guardados
- [x] Manejo de errores

### Traducciones
- [x] Traducciones ES/EN para edición
- [x] Mensajes de confirmación
- [x] Mensajes de error


## Funcionalidad de Duplicación de Proyectos

### Función duplicateProject
- [x] Crear función duplicateProject en project-storage.ts
- [x] Generar nuevo ID único para el proyecto duplicado
- [x] Agregar sufijo "(Copia)" al nombre del proyecto
- [x] Copiar todos los datos del proyecto original
- [x] Actualizar timestamps (createdAt, updatedAt)
- [x] Guardar proyecto duplicado en AsyncStorage

### Integración en UI
- [x] Agregar botón "Duplicar" en pantalla de resultados
- [x] Implementar handler de duplicación
- [x] Mostrar confirmación de duplicación exitosa
- [x] Navegar al proyecto duplicado tras crear copia
- [x] Feedback háptico en interacción

### Traducciones
- [x] Traducciones ES/EN para duplicación
- [x] Mensajes de confirmación
- [x] Mensajes de error


## Exportación e Importación Masiva de Proyectos

### Funciones de Backend
- [x] Crear función exportAllProjects en project-storage.ts
- [x] Crear función importProjects en project-storage.ts
- [x] Validación de estructura JSON en importación
- [x] Manejo de conflictos de IDs duplicados
- [x] Preservar datos existentes durante importación

### UI de Exportación
- [x] Agregar botón "Exportar Proyectos" en Settings
- [x] Generar archivo JSON con timestamp en nombre
- [x] Usar expo-sharing para compartir archivo
- [x] Mostrar confirmación de exportación exitosa
- [x] Indicador de cantidad de proyectos exportados

### UI de Importación
- [x] Agregar botón "Importar Proyectos" en Settings
- [x] Usar expo-document-picker para seleccionar archivo
- [x] Validar formato JSON antes de importar
- [x] Mostrar resumen de proyectos a importar
- [x] Confirmación antes de sobrescribir datos
- [x] Feedback de progreso durante importación

### Validaciones y Seguridad
- [x] Validar estructura de datos JSON
- [x] Verificar campos requeridos en cada proyecto
- [x] Regenerar IDs si hay conflictos
- [x] Manejo de errores con mensajes claros
- [x] Opción de cancelar importación

### Traducciones
- [x] Traducciones ES/EN para exportación
- [x] Traducciones ES/EN para importación
- [x] Mensajes de éxito y error
- [x] Confirmaciones y advertencias


## Implementación de PWA (Progressive Web App)

### Configuración de Manifest
- [x] Crear/actualizar manifest.json con metadatos completos
- [x] Configurar nombre, descripción y colores de la app
- [x] Agregar iconos en múltiples tamaños (192x192, 512x512)
- [x] Configurar display mode como "standalone"
- [x] Configurar orientación preferida
- [x] Agregar theme_color y background_color

### Service Worker
- [x] Crear service-worker.js para funcionamiento offline
- [x] Implementar estrategia de caché para assets estáticos
- [x] Implementar estrategia de caché para datos dinámicos
- [x] Configurar precaching de recursos críticos
- [x] Implementar actualización automática del service worker
- [x] Manejar eventos de instalación y activación

### Instalación y UX
- [x] Detectar si la app ya está instalada
- [x] Crear prompt de instalación personalizado
- [x] Agregar banner de instalación en la app
- [x] Implementar evento beforeinstallprompt
- [x] Mostrar confirmación después de instalación
- [x] Ocultar prompt si ya está instalado

### Testing PWA
- [ ] Probar instalación en Chrome/Edge
- [ ] Probar instalación en Safari iOS
- [ ] Verificar funcionamiento offline
- [ ] Verificar actualización de caché
- [ ] Validar con Lighthouse PWA audit


## Búsqueda y Filtros en Lista de Proyectos

### Barra de Búsqueda
- [x] Crear componente SearchBar con input de búsqueda
- [x] Implementar búsqueda en tiempo real (debounce 300ms)
- [x] Buscar por nombre de proyecto
- [ ] Resaltar coincidencias en resultados
- [x] Mostrar contador de resultados

### Filtros por Métricas
- [ ] Crear componente FilterPanel
- [ ] Filtro por rango de ROI (slider con min/max)
- [ ] Filtro por rango de NPV (slider con min/max)
- [ ] Filtro por rango de TIR (slider con min/max)
- [ ] Botón "Limpiar Filtros"
- [ ] Mostrar filtros activos como chips

### Ordenamiento
- [x] Crear componente SortSelector
- [x] Ordenar por fecha de creación (asc/desc)
- [x] Ordenar por nombre (A-Z / Z-A)
- [x] Ordenar por ROI (mayor/menor)
- [x] Ordenar por NPV (mayor/menor)
- [ ] Ordenar por TIR (mayor/menor)
- [ ] Persistir preferencia de ordenamiento

### Filtros Rápidos
- [x] Chips de filtro rápido (Todos/Viables/Riesgosos)
- [x] Viable = ROI > 0
- [x] Riesgoso = ROI < 0
- [x] Mostrar contador por categoría

### Integración y UX
- [x] Integrar todos los componentes en pantalla Home
- [ ] Animaciones de transición al filtrar
- [x] Estado vacío personalizado cuando no hay resultados
- [ ] Persistir filtros en AsyncStorage
- [x] Traducciones ES/EN completas


## Gráficos Comparativos en Comparación de Escenarios

### Componente de Gráfico Comparativo
- [x] Crear componente ComparisonChart con líneas superpuestas
- [x] Línea base (escenario original) en un color
- [x] Línea dinámica (escenario ajustado) en otro color
- [x] Leyenda clara para diferenciar líneas
- [x] Soporte para scroll horizontal si hay muchos meses
- [x] Optimización para tema oscuro/claro

### Integración en Pantalla de Comparación
- [x] Agregar gráfico comparativo en /compare/[id]
- [x] Mostrar flujo de caja mensual comparativo
- [x] Mostrar flujo de caja acumulado comparativo
- [x] Actualización en tiempo real al mover sliders
- [x] Traducciones ES/EN completas


## Sistema de Auto-guardado en Formularios

### Hook de Auto-guardado
- [ ] Crear hook useAutoSave con timer de 30 segundos
- [ ] Detectar cambios en campos del formulario
- [ ] Guardar borrador en AsyncStorage automáticamente
- [ ] Retornar estado de guardado (saving, saved, error)
- [ ] Limpiar timer al desmontar componente

### Almacenamiento de Borradores
- [ ] Crear funciones saveDraft y loadDraft en project-storage
- [ ] Usar clave única para cada borrador (draft_new o draft_{id})
- [ ] Guardar timestamp del último guardado
- [ ] Limpiar borrador al guardar proyecto final
- [ ] Recuperar borrador al abrir formulario

### Integración en Formularios
- [ ] Integrar useAutoSave en new-project.tsx
- [ ] Integrar useAutoSave en edit-project/[id].tsx
- [ ] Cargar borrador automáticamente al abrir formulario
- [ ] Mostrar alerta si hay borrador disponible
- [ ] Opción de descartar borrador

### Indicador Visual
- [ ] Crear componente AutoSaveIndicator
- [ ] Mostrar "Guardando..." mientras guarda
- [ ] Mostrar "Guardado" con checkmark cuando completa
- [ ] Mostrar "Error al guardar" si falla
- [ ] Animación sutil de transición entre estados

### Traducciones
- [ ] Traducciones ES/EN para auto-guardado
- [ ] Mensajes de estado
- [ ] Alertas de recuperación de borrador


## Snapshot de Escenarios (Funcionalidad Premium)

### Estructura de Datos
- [x] Actualizar tipos en types/project.ts para incluir Snapshot
- [x] Agregar campo snapshots[] en ProjectData
- [x] Definir interfaz ScenarioSnapshot con timestamp, nombre, ajustes

### Funciones de Almacenamiento
- [x] Crear función saveSnapshot en project-storage.ts
- [x] Crear función getSnapshots en project-storage.ts
- [x] Crear función deleteSnapshot en project-storage.ts
- [x] Crear función restoreSnapshot en project-storage.ts
- [x] Actualizar proyecto con snapshots en AsyncStorage

### UI de Guardado de Snapshot
- [x] Agregar botón "Guardar como Base" en /compare/[id]
- [x] Crear modal para nombrar snapshot
- [x] Implementar confirmación de guardado
- [x] Actualizar escenario base con valores del snapshot
- [x] Feedback háptico y visual

### Pantalla de Historial
- [x] Crear pantalla /snapshots/[id] para ver historial
- [x] Listar todos los snapshots del proyecto
- [x] Mostrar fecha, nombre y ajustes de cada snapshot
- [x] Botón para ver detalles de cada snapshot
- [x] Botón para eliminar snapshots
- [x] Botón para restaurar snapshot como base

### Comparación entre Snapshots
- [x] Agregar selector de snapshots en comparación
- [x] Permitir seleccionar snapshot base vs snapshot dinámico
- [x] Mostrar diferencias entre snapshots seleccionados
- [x] Actualizar gráficos comparativos

### Traducciones
- [x] Traducciones ES/EN para snapshots
- [x] Mensajes de confirmación
- [x] Nombres de snapshots por defecto


## Skeleton Loaders (UX Enhancement)

### Componente Base
- [x] Crear componente SkeletonLoader reutilizable
- [x] Implementar animación shimmer/pulse con Animated API
- [x] Configurar colores para tema claro y oscuro
- [x] Crear variantes (rectangular, circular, text)

### Implementación en Listas
- [x] Crear SkeletonProjectCard para lista de proyectos
- [x] Integrar skeleton en pantalla Home durante carga
- [x] Crear SkeletonSnapshotCard para lista de snapshots
- [x] Integrar skeleton en pantalla de historial durante carga
- [x] Ajustar timing de animaciones (duración, delay)


## Tutorial de Onboarding (Primera Experiencia de Usuario)

### Componente de Tutorial
- [x] Crear componente OnboardingTutorial con modal/overlay
- [x] Implementar navegación entre pasos (Siguiente, Anterior, Saltar)
- [x] Crear indicadores de progreso (dots/steps)
- [x] Implementar animaciones de transición entre pasos
- [x] Diseñar layout responsivo para diferentes tamaños de pantalla

### Contenido del Tutorial
- [x] Paso 1: Bienvenida y propósito de la app
- [x] Paso 2: Cómo crear un nuevo proyecto
- [x] Paso 3: Cómo comparar escenarios con sliders
- [x] Paso 4: Cómo guardar y gestionar snapshots
- [x] Paso 5: Exportar reportes en PDF
- [x] Traducciones ES/EN para todo el contenido

### Lógica de Persistencia
- [x] Crear función para detectar primer uso (AsyncStorage)
- [x] Implementar flag hasSeenTutorial en AsyncStorage
- [x] Agregar opción "No volver a mostrar"
- [x] Crear función para resetear tutorial (desde Settings)

### Integración
- [x] Mostrar tutorial automáticamente en primer uso
- [x] Agregar botón "Ver Tutorial" en Settings
- [x] Implementar animación de entrada/salida del tutorial
- [x] Probar flujo completo en diferentes idiomas


## Biblioteca de Plantillas de Proyectos (Templates)

### Definición de Plantillas
- [x] Definir estructura de datos para ProjectTemplate
- [x] Investigar valores típicos para SaaS (MRR, CAC, Churn)
- [x] Investigar valores típicos para E-commerce (AOV, conversión, inventario)
- [x] Investigar valores típicos para Manufactura (CAPEX, COGS, capacidad)
- [x] Crear plantilla "Desde Cero" (vacía)

### Módulo de Plantillas
- [x] Crear archivo project-templates.ts con todas las plantillas
- [x] Implementar función getProjectTemplates()
- [x] Implementar función getTemplateById()
- [x] Implementar función applyTemplate()
- [x] Agregar iconos/emojis para cada industria

### UI de Selección de Plantillas
- [x] Crear componente TemplateSelector
- [x] Diseñar tarjetas de plantillas con preview
- [x] Mostrar valores típicos de cada plantilla
- [x] Integrar en pantalla de nuevo proyecto
- [x] Implementar flujo: seleccionar plantilla → editar valores → calcular

### Traducciones
- [x] Traducciones ES/EN para nombres de plantillas
- [x] Traducciones ES/EN para descripciones de industrias
- [x] Traducciones ES/EN para métricas específicas por industria


## Modo Oscuro Completo (Dark Mode)

### Sistema de Temas
- [x] Revisar ThemeProvider existente en lib/theme-provider.tsx
- [x] Revisar configuración de colores en theme.config.js
- [x] Verificar variables CSS en global.css

### Lógica de Cambio de Tema
- [x] Implementar función setTheme en ThemeProvider
- [x] Persistir preferencia de tema en AsyncStorage
- [x] Detectar preferencia del sistema operativo
- [x] Implementar modo "auto" que sigue al sistema
- [x] Manejar cambios dinámicos del sistema

### Integración con Settings
- [x] Conectar botones de tema en Settings con ThemeProvider
- [x] Implementar transiciones suaves al cambiar tema
- [x] Actualizar UI inmediatamente sin reiniciar
- [x] Mostrar tema activo actual en Settings

### Testing
- [x] Probar cambio manual de tema (light/dark/auto)
- [x] Probar persistencia al cerrar y reabrir app
- [x] Probar sincronización con cambios del sistema
- [x] Verificar colores en todas las pantallas


## Enlaces Compartibles de Solo Lectura (Share Links)

### Sistema de Enlaces
- [x] Crear función generateShareableLink en project-storage.ts
- [x] Generar ID único para cada enlace (UUID o hash)
- [x] Codificar datos del proyecto en formato compacto (base64)
- [x] Crear estructura de URL: /shared/[shareId]
- [x] Implementar función decodeSharedProject

### Pantalla de Vista Compartida
- [x] Crear pantalla /shared/[shareId].tsx
- [x] Diseño de solo lectura (sin botones de editar/eliminar)
- [x] Mostrar todos los datos del proyecto
- [x] Mostrar métricas financieras calculadas
- [x] Mostrar gráficos de flujo de caja y ROI
- [x] Banner indicando "Vista de Solo Lectura"
- [x] Botón "Duplicar a Mis Proyectos" opcional

### UI de Compartir
- [x] Agregar botón "Compartir" en pantalla de proyecto
- [x] Modal con opciones de compartir
- [x] Botón "Copiar Enlace" con feedback visual
- [x] Botón "Compartir vía..." con opciones nativas
- [x] Mostrar preview del enlace generado
- [x] Feedback háptico al copiar

### Compartir Nativo
- [x] Integrar expo-sharing para compartir nativo
- [x] Opciones: WhatsApp, Email, SMS, Más...
- [x] Texto predefinido con descripción del proyecto
- [x] Funcional en iOS, Android y Web
- [x] Fallback a copiar enlace en plataformas sin soporte

### Traducciones
- [x] Traducciones ES/EN para UI de compartir
- [x] Mensajes de confirmación
- [x] Texto de compartir predefinido


## Sistema de Notificaciones Push (Recordatorios de Revisión)

### Configuración de Notificaciones
- [x] Solicitar permisos de notificaciones al usuario
- [x] Configurar expo-notifications
- [x] Crear función para verificar permisos
- [x] Manejar estados de permisos (granted, denied, undetermined)
- [x] Configurar canales de notificación (Android)

### Módulo de Recordatorios
- [x] Crear notification-manager.ts con funciones de gestión
- [x] Función scheduleProjectReminder(projectId, frequency)
- [x] Función cancelProjectReminder(projectId)
- [x] Función updateProjectReminder(projectId, frequency)
- [x] Función getAllScheduledReminders()
- [x] Persistir configuración en AsyncStorage
- [x] Frecuencias: Semanal, Quincenal, Mensual, Trimestral

### UI de Configuración
- [x] Agregar sección "Recordatorios" en Settings
- [x] Toggle para habilitar/deshabilitar recordatorios globales
- [x] Selector de frecuencia por defecto
- [ ] Lista de proyectos con recordatorios activos
- [ ] Botón para configurar recordatorio individual por proyecto
- [ ] Indicador visual de próximo recordatorio

### Integración en Proyectos
- [x] Agregar opción de recordatorio al crear proyecto
- [ ] Agregar opción de recordatorio al editar proyecto
- [ ] Mostrar estado de recordatorio en pantalla de proyecto
- [ ] Botón para activar/desactivar recordatorio rápidamente
- [ ] Actualizar recordatorio al duplicar proyecto

### Contenido de Notificaciones
- [x] Título: "Revisión de Proyecto: {nombre}"
- [x] Cuerpo: "Es momento de revisar el análisis financiero"
- [x] Deep link a pantalla del proyecto
- [x] Badge count en icono de app
- [x] Sonido y vibración configurables

### Traducciones
- [x] Traducciones ES/EN para UI de recordatorios
- [x] Textos de notificaciones en ambos idiomas
- [x] Mensajes de confirmación


## Análisis de Sensibilidad (Sensitivity Analysis)

### Función de Cálculo
- [x] Crear sensitivity-calculator.ts con funciones de análisis
- [x] Función calculateSensitivity(project, variable, variation)
- [x] Función calculateMultiVariableSensitivity(project, variations)
- [x] Variables analizables: inversión, ingresos, costos operativos, costos mantenimiento
- [x] Variaciones: -30%, -20%, -10%, 0%, +10%, +20%, +30%
- [x] Calcular NPV y ROI para cada variación
- [x] Identificar variable con mayor impacto

### Matriz de Sensibilidad
- [x] Crear componente SensitivityMatrix
- [x] Tabla interactiva con variables en filas y variaciones en columnas
- [x] Mostrar NPV y ROI para cada combinación
- [x] Código de colores: verde (positivo), rojo (negativo), amarillo (neutral)
- [x] Resaltar celda del escenario base (0%)
- [x] Formato de moneda para NPV
- [x] Formato de porcentaje para ROI

### Tornado Chart
- [x] Crear componente TornadoChart
- [x] Visualizar impacto de cada variable en NPV
- [x] Barras horizontales: izquierda (negativo), derecha (positivo)
- [x] Ordenar variables por impacto (mayor a menor)
- [x] Colores diferenciados por variable
- [x] Etiquetas con valores absolutos
- [x] Línea central en escenario base

### Integración
- [x] Agregar tab "Sensibilidad" en pantalla de proyecto
- [x] Mostrar matriz de sensibilidad
- [x] Mostrar tornado chart
- [x] Selector de métrica (NPV o ROI)
- [ ] Botón para exportar análisis a PDF
- [x] Descripción educativa del análisis

### Traducciones
- [x] Traducciones ES/EN para análisis de sensibilidad
- [x] Nombres de variables
- [x] Descripciones de impacto


## Exportación de Análisis de Sensibilidad a PDF

### Extensión del Módulo PDF
- [x] Extender pdf-generator.ts con función generateSensitivityPDF
- [x] Crear sección de análisis de sensibilidad en PDF
- [x] Incluir tabla de matriz de sensibilidad
- [x] Incluir representación visual del tornado chart
- [x] Agregar página de portada para análisis de sensibilidad

### Generación de Contenido Visual
- [x] Convertir matriz de sensibilidad a tabla HTML para PDF
- [x] Aplicar código de colores en celdas de la tabla
- [x] Generar gráfico de barras horizontales para tornado chart
- [x] Crear leyendas y anotaciones explicativas
- [x] Optimizar diseño para impresión

### Recomendaciones Automáticas
- [x] Analizar resultados de sensibilidad
- [x] Identificar variable con mayor impacto
- [x] Identificar variables de alto riesgo (NPV negativo en variaciones)
- [x] Generar recomendaciones de monitoreo
- [x] Sugerir estrategias de mitigación de riesgos

### Integración en UI
- [x] Agregar botón "Exportar Análisis" en tab de sensibilidad
- [x] Implementar indicador de progreso durante generación
- [x] Compartir PDF generado con opciones nativas
- [x] Feedback háptico y visual al completar

### Traducciones
- [x] Traducciones ES/EN para exportación de sensibilidad
- [x] Textos de recomendaciones
- [x] Títulos de secciones del PDF


## Dashboard Comparativo Multi-Proyecto

### Pantalla de Dashboard
- [x] Crear pantalla /dashboard.tsx
- [x] Cargar todos los proyectos guardados
- [x] Calcular métricas agregadas (total invertido, ROI promedio, etc.)
- [x] Diseño con tabs para diferentes vistas
- [x] Skeleton loaders durante carga

### Gráficos Comparativos
- [x] Crear componente ComparisonBarChart
- [x] Gráfico de barras para ROI de todos los proyectos
- [x] Gráfico de barras para NPV de todos los proyectos
- [x] Gráfico de barras para Payback Period
- [x] Código de colores: verde (positivo), rojo (negativo)
- [x] Etiquetas con valores en cada barra
- [x] Ordenamiento por valor (mayor a menor)

### Tabla Comparativa
- [x] Crear componente ProjectComparisonTable
- [x] Columnas: Nombre, ROI, NPV, Payback, Fecha
- [x] Ordenamiento por cualquier columna (tap en header)
- [x] Indicadores visuales de rendimiento
- [x] Navegación a detalle del proyecto al tap
- [x] Formato de moneda y porcentajes

### Métricas Agregadas
- [x] Card de total de proyectos
- [x] Card de inversión total
- [x] Card de ROI promedio
- [x] Card de mejor proyecto (mayor ROI)
- [x] Card de NPV total del portafolio

### Integración en Navegación
- [x] Agregar tab "Dashboard" en navegación principal
- [x] Ícono apropiado para dashboard
- [ ] Badge con número de proyectos
- [ ] Actualización automática al crear/editar proyectos

### Traducciones
- [x] Traducciones ES/EN para dashboard
- [x] Nombres de métricas agregadas
- [x] Títulos de gráficos


## Análisis de Punto de Equilibrio (Break-Even Analysis)

### Cálculo de Break-Even
- [x] Crear función calculateBreakEven en financial-calculator.ts
- [x] Calcular mes en que ingresos acumulados superan costos totales
- [x] Generar datos mensuales acumulativos de ingresos
- [x] Generar datos mensuales acumulativos de costos (inversión + operativos + mantenimiento)
- [x] Identificar punto de intersección (break-even point)
- [x] Manejar casos donde no se alcanza break-even en periodo analizado

### Gráfico de Líneas Acumulativo
- [x] Crear componente BreakEvenChart
- [x] Línea de ingresos acumulados (color verde)
- [x] Línea de costos acumulados (color rojo)
- [x] Punto de intersección marcado con círculo
- [x] Línea vertical punteada en mes de break-even
- [x] Etiquetas de ejes (Meses, Monto USD)
- [x] Leyenda explicativa
- [x] Grid de fondo para facilitar lectura

### Métricas de Break-Even
- [x] Card con mes de break-even
- [x] Card con monto en punto de equilibrio
- [x] Indicador visual de si se alcanza break-even
- [x] Mensaje si no se alcanza en periodo proyectado
- [x] Porcentaje del periodo hasta break-even

### Integración en Proyecto
- [x] Agregar sección de Break-Even en pantalla de proyecto
- [x] Mostrar después de métricas principales
- [x] Incluir en tab de Overview
- [x] Descripción educativa del concepto
- [x] Interpretación de resultados

### Traducciones
- [x] Traducciones ES/EN para break-even
- [x] Términos técnicos (punto de equilibrio, ingresos acumulados, etc.)
- [x] Mensajes de interpretación


## Mejoras de Experiencia de Usuario (UX Polish)

### Sistema de Actualización Automática
- [ ] Crear módulo de eventos (EventEmitter) para comunicación entre pantallas
- [ ] Evento 'projectCreated' al crear nuevo proyecto
- [ ] Evento 'projectUpdated' al editar proyecto
- [ ] Evento 'projectDeleted' al eliminar proyecto
- [ ] Home escucha eventos y refresca lista automáticamente
- [ ] Dashboard escucha eventos y recalcula métricas automáticamente

### Badges de Estado Visual
- [ ] Crear componente ProjectStatusBadge
- [ ] Lógica de clasificación: Viable (ROI>20% y NPV>0), Revisar (ROI 0-20% o NPV>0), Inviable (ROI<0 y NPV<0)
- [ ] Colores: Verde (Viable), Amarillo (Revisar), Rojo (Inviable)
- [ ] Integrar badge en ProjectCard
- [ ] Mostrar en esquina superior derecha de cada tarjeta
- [ ] Icono + texto descriptivo

### Búsqueda y Filtros
- [ ] Agregar barra de búsqueda en Home
- [ ] Búsqueda por nombre de proyecto (case-insensitive)
- [ ] Filtro por estado (Todos, Viable, Revisar, Inviable)
- [ ] Botones de filtro con contador de proyectos
- [ ] Persistir búsqueda mientras usuario navega
- [ ] Limpiar búsqueda con botón X
- [ ] Mensaje "No se encontraron proyectos" si búsqueda vacía

### Confirmaciones Visuales (Toast/Snackbar)
- [ ] Crear componente Toast reutilizable
- [ ] Tipos: success, error, info, warning
- [ ] Animación de entrada/salida
- [ ] Auto-dismiss después de 3 segundos
- [ ] Posición: bottom con safe area
- [ ] Integrar en: guardar snapshot, compartir proyecto, exportar PDF, crear proyecto, eliminar proyecto
- [ ] Mensajes claros y concisos

### Traducciones
- [ ] Traducciones ES/EN para badges de estado
- [ ] Traducciones para mensajes de toast
- [ ] Traducciones para placeholders de búsqueda


## Integración Completa de Funcionalidades Existentes

### Break-Even en Exportación PDF
- [x] Extender pdf-generator.ts para incluir sección de break-even
- [x] Agregar métricas de break-even (mes, monto) al PDF
- [x] Incluir gráfico de break-even en el reporte
- [x] Agregar interpretación automática (temprano/medio/tardío)
- [x] Incluir recomendaciones de capital de trabajo

### Break-Even en Dashboard
- [x] Agregar columna "Mes de Equilibrio" en tabla comparativa
- [ ] Implementar ordenamiento por break-even
- [x] Mostrar "N/A" si no se alcanza break-even
- [x] Formato legible del mes (ej: "Mes 12")
- [ ] Indicador visual de break-even temprano/tardío

### Deep Linking en Notificaciones
- [x] Configurar deep linking en app.config.ts
- [x] Actualizar notification-manager.ts para incluir projectId en data
- [x] Implementar listener de notificaciones en _layout.tsx
- [x] Navegar a pantalla de proyecto al tocar notificación
- [x] Probar deep linking en iOS y Android

### Estado de Recordatorio Visible
- [x] Agregar función hasActiveReminder en notification-manager.ts
- [x] Mostrar icono 🔔 en ProjectCard si tiene recordatorio
- [ ] Agregar badge con frecuencia (S/Q/M/T) opcional
- [x] Actualizar ProjectCard para cargar estado de recordatorio
- [x] Probar visibilidad en lista de proyectos


## Optimizaciones de Rendimiento y Datos

### Sistema de Caché de Cálculos
- [x] Crear módulo calculation-cache.ts con Map para caché
- [x] Implementar función getCachedCalculation con hash de inputs
- [ ] Cachear resultados de calculateSensitivity
- [ ] Cachear resultados de calculateBreakEven
- [x] Invalidar caché cuando cambian inputs del proyecto
- [x] Límite de tamaño de caché (100 entradas)

### Compresión de Datos en AsyncStorage
- [x] Instalar lz-string para compresión
- [x] Crear wrapper compressData/decompressData
- [x] Comprimir proyectos antes de guardar en AsyncStorage
- [x] Descomprimir al cargar proyectos
- [x] Comprimir snapshots (ocupan más espacio)
- [ ] Medir reducción de espacio en logs

### Límites de Proyectos y Snapshots
- [x] Implementar límite de 100 proyectos totales
- [x] Implementar límite de 20 snapshots por proyecto
- [x] Crear función cleanOldProjects para eliminar más antiguos
- [x] Crear función cleanOldSnapshots por proyecto
- [ ] Mostrar advertencia cuando se acerca al límite
- [ ] Agregar opción manual de limpieza en Settings

### Optimización de Listas
- [x] Verificar uso de FlatList en Home (ya implementado)
- [x] Agregar keyExtractor optimizado
- [ ] Implementar getItemLayout para rendimiento
- [x] Usar memo en ProjectCard para evitar re-renders
- [x] Limitar cálculos en renderizado de lista
- [ ] Lazy loading de imágenes/gráficos si aplica

### Traducciones
- [ ] Traducciones ES/EN para mensajes de límites
- [ ] Traducciones ES/EN para opciones de limpieza


## Correcciones de Internacionalización y Branding

### Menús de Navegación
- [ ] Actualizar tabs de navegación para usar traducciones (Home, Dashboard, Settings)
- [ ] Agregar claves de traducción para nombres de tabs
- [ ] Verificar que tabs cambien idioma en tiempo real

### Sección Acerca de en Settings
- [ ] Eliminar enlaces de "Soporte y Ayuda" que redirigen a Manus
- [ ] Eliminar enlaces de "Términos y Condiciones" que redirigen a Manus
- [ ] Eliminar enlaces de "Política de Privacidad" que redirigen a Manus
- [ ] Cambiar footer de "Hecho con ❤️ por Manus" a "© 2026 Vanguard Crux. All rights reserved."
- [ ] Actualizar traducciones ES/EN para nuevo footer


## Correcciones Aplicadas

### Menús de Navegación
- [x] Actualizar tabs de navegación para usar traducciones (Home, Dashboard, Settings)
- [x] Agregar claves de traducción para nombres de tabs
- [x] Verificar que tabs cambien idioma en tiempo real

### Sección Acerca de en Settings
- [x] Eliminar enlaces de "Soporte y Ayuda" que redirigen a Manus
- [x] Eliminar enlaces de "Términos y Condiciones" que redirigen a Manus
- [x] Eliminar enlaces de "Política de Privacidad" que redirigen a Manus
- [x] Cambiar footer de "Hecho con ❤️ por Manus" a "© 2026 Vanguard Crux. All rights reserved."
- [x] Actualizar traducciones ES/EN para nuevo footer


## Corrección de Traducción en Dashboard

- [x] Verificar clave "home.create_project" en archivos de traducción
- [x] Corregir clave faltante o mal referenciada
- [x] Probar que el botón muestre el texto correcto en ambos idiomas


# Plan de Transformación a SaaS Comercializable

## 🜢 FASE 0: Seguridad y Control de Versiones
- [x] Crear rama de seguridad archive/v1-manus-prototype
- [x] Push de rama de seguridad (checkpoint 9c215b53 como respaldo)
- [x] Crear rama de trabajo feature/independent-architecture
- [x] Confirmar que estamos en la nueva rama

## 🜡 FASE 1: Independencia del Core de IA
- [x] Instalar SDK oficial de OpenAI (npm install openai)
- [x] Refactorizar server/routes/ai.ts para usar SDK de OpenAI directamente
- [x] Implementar uso de process.env.OPENAI_API_KEY
- [x] Permitir systemPrompt personalizado para personalidad del analista
- [x] Crear endpoint de test /api/ai/status para verificar conexión
- [x] Probar endpoint con API key propia (tests pasando 2/2)

## 🔵 FASE 2: Infraestructura de Negocio (Auth & Monetización)
- [x] Estandarizar DB a MySQL con Drizzle ORM (ya existía)
- [x] Extender schema users con campos de suscripción
- [x] Crear servicio subscription-service.ts con lógica de límites
- [x] Instalar react-native-purchases (RevenueCat)
- [x] Configurar lógica de suscripciones en Backend (rutas /api/subscription)
- [x] Configurar lógica de suscripciones en Frontend (hook use-subscription)
- [x] Implementar límites: FREE (3 análisis), PREMIUM (ilimitado)
- [x] Crear pantalla PaywallScreen.tsx con UI completa
- [x] Integrar verificación de límites en /api/ai/insights
- [ ] Configurar RevenueCat API keys (iOS y Android)
- [ ] Probar flujo completo de suscripción


# Sistema de Mock de Pagos (Adapter Pattern)

- [x] Crear interfaz PurchaseService abstracta
- [x] Implementar RevenueCatService (producción)
- [x] Implementar MockPurchaseService (desarrollo)
- [x] Configurar switch con EXPO_PUBLIC_USE_MOCK_PAYMENTS
- [x] Agregar persistencia de estado Premium en AsyncStorage
- [x] Actualizar hook use-subscription para usar adapter
- [ ] Configurar variable EXPO_PUBLIC_USE_MOCK_PAYMENTS=true en .env
- [ ] Probar flujo completo: ver paywall, comprar, desbloquear Premium
- [ ] Verificar que estado persiste al reiniciar app


# Device Fingerprinting (Prevención de Abuso)

- [x] Instalar expo-application para device IDs
- [x] Crear tabla device_usage en schema de Drizzle
- [x] Migrar base de datos con nueva tabla
- [x] Crear servicio device-usage-service.ts
- [x] Modificar middleware de /api/ai/insights para verificar deviceId
- [x] Actualizar frontend para enviar deviceId en headers
- [x] Lógica: PREMIUM sin límites, FREE limitado por dispositivo (3 análisis)
- [x] Crear hook use-device-id.ts para obtener identificador único
- [x] Integrar deviceId en generateAIInsights y ProjectDetailsScreen
- [x] Navegación automática a paywall cuando se excede límite
- [ ] Probar flujo: crear cuenta nueva en mismo dispositivo, verificar límite persiste
