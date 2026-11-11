# ATREZZO COMPONENT LIBRARY

Biblioteca centralizada y catálogo visual de patrones frontend para **ATREZZO WEBS**. No es una colección de templates: cada variante posee identidad, una demo individual, ficha técnica, procedencia y estado de validación.

## Acceso
- Catálogo visual: [catalog/index.html](catalog/index.html) (al habilitar GitHub Pages se publicará bajo `https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/`).
- Índice para agentes: [registry/components.json](registry/components.json).
- Instrucciones operativas: [AGENTS.md](AGENTS.md).
- Estado de fases: [ATREZZO-PROJECT-STATUS.md](ATREZZO-PROJECT-STATUS.md).

> GitHub Pages está configurado en **main / (root)**. Su funcionamiento público completo no está verificado automáticamente desde este entorno.

## Organización

```
catalog/                     Catálogo con filtros y previews individuales
registry/components.json     Inventario estructurado para ChatGPT
registry/intake.json         Material recibido pendiente de ingestión
components/scroll/           HTML + JS por cada ID (10 scrolls) + fichas técnicas\ncomponents/transiciones/    HTML + JS por cada ID (1 transición)\ncomponents/runtime/         lifecycle.js (instalación/desmontaje individual) + CSS encapsulado
sources/codrops-layout-formations/
  index.html                 HTML original bajo licencia MIT
  css/base.css               CSS original
  js/index.js                JS original (fuente de referencia)
  js/pattern-engine.js       Archivo histórico, no usar en nuevas integraciones
  LICENSE                    Licencia original de código
AGENTS.md                    Contrato de selección e integración IA
```

## Cómo pedir un movimiento concreto

**Ejemplo:** “En la página About de este cliente utiliza el componente `ATZ-SCR-004` para la galería de proyectos. Consulta `registry/components.json` y `components/scroll/ATZ-SCR-004.md`; importa **solo** ese patrón, respeta la identidad aprobada y comprueba reduced-motion, móvil y scroll inverso.”

**No basta** con pedir “ponle la animación del ZIP”. Para reproducir el efecto se requiere la estructura DOM, CSS, JS, dependencias y pruebas.

## Estados
- `reference`: referencia identificada y atribuida; no habilitada automáticamente para clientes.
- `validation`: aislada o adaptada, pero pendiente de pruebas completas.
- `ready`: verificada con criterios técnicos y aprobación visual.
- `deprecated`: conservada por trazabilidad, no reutilizar.

## Política
No copiar el layout completo de una demo ni asumir autorización comercial de fotografías/fuentes. No inventar testimonios, proyectos, equipo o datos del cliente. No forzar scroll, respetar `prefers-reduced-motion`, verificar 375/768/1024/1440 px, navegar por teclado y mantener el contenido visible sin JS.

**Origen del primer paquete:** Codrops, *On-Scroll Layout Formations*, © 2024, licencia MIT para el código. Imágenes de demostración externas: **solo referencia visual**, derechos de uso comercial no certificados.

## Fase 3 — Código independiente por componente
Los 11 IDs cuentan ahora con archivos `.html` y `.js` propios. Solo comparten `components/runtime/lifecycle.js` y `components/runtime/atrezzo-motion.css`. Cada módulo activa **una** timeline y ofrece `mount(host,{gsap,ScrollTrigger})`, `refresh()` y `destroy()`. Consulta [guía de integración](components/runtime/README.md). Estado: `validation` hasta completar pruebas reales de navegador y en proyectos clientes.

## Fase 4 — Selección con ChatGPT

Consulta [contrato IA](docs/AI-INTEGRATION-WORKFLOW.md). `node scripts/resolve-component.mjs ATZ-SCR-008` devuelve un solo ID; añade `--prompt` para la instrucción de ChatGPT. `node scripts/export-component.mjs ATZ-SCR-008 --out ./salida` prepara la copia independiente para integrarla más tarde en un cliente. [Laboratorio autónomo](examples/ai-ATZ-SCR-008/). No modifica automáticamente ninguna web comercial.

## Fase 4 — Resultado técnico

La resolución estricta y la exportación de un único ID superaron CI. La [página de laboratorio](examples/ai-ATZ-SCR-008/) pasó pruebas Chromium con un módulo y estilos anfitriones independientes. Ver [informe de Fase 4](ATREZZO-PHASE4-REPORT.md). La integración real con clientes aún requiere auditoría y autorización específica.

## Fase 5 — ATREZZO NAVIGATION 01

Tres nuevos módulos individuales de código original Atrezzo Studios: [Immersive Menu](components/navegacion/ATZ-NAV-001.md), [Chapter Rail](components/navegacion/ATZ-NAV-002.md) y [Context Dock](components/navegacion/ATZ-NAV-003.md). No dependen de GSAP. El registro ahora cuenta con **14 IDs y 3 categorías**. Los tres están en `validation` y usan composiciones abstractas provisionales, no fotografías sin autorización. Consultar [informe de ingesta](ATREZZO-NAVIGATION-INGEST-REPORT.md).

## Sticky Sections 15 — Colección aprobada

Quince variaciones adicionales de salida de secciones sticky mediante scroll, registradas como `ATZ-STK-001` a `ATZ-STK-015`. Fuente: Codrops *Animations for Sticky Sections* (código MIT), aportada en `ATREZZO_03_StickySections_15_MAC_LISTO(1).zip`. Cada efecto tiene HTML, JS, ficha y demo individual; CSS y ciclo de vida compartidos. Las ilustraciones originales de terceros se sustituyen por SVG abstractos de referencia. El Lenis global de la demo no se instala en los clientes. El total del catálogo pasa a **29 componentes**.

## ATREZZO SCROLL SECTIONS 01–03 — nueve componentes originales

Disponibles `ATZ-SEC-001…009`, extraídos del paquete aprobado `ATREZZO_SCROLL_01_02_03_NUEVE_COMPONENTES_PARA_INTEGRACION.zip`. Familias 01 (Expand, Split, Sequence), 02 (Cinematic Handoff, Horizontal Filmstrip, Depth Chapters) y 03 (Full-Bleed Chapters, Editorial Layered Panels, Split Narrative). HTML/JS por ID y CSS/motor compartidos por familia. **Sin GSAP**: navegación por scroll nativo, reduced motion y fallback. Estado de biblioteca: `validation`; 38 IDs registrados; ver fichas en `components/secciones/`.

## Motion Library V1: siete módulos visuales nativos

Se han separado e incorporado `ATZ-MOT-001..007`: Text Reveal, Text Scrub, Image Parallax, Home Hero Collage, Cinematic Hero Reveal, Editorial Journey y Burned Image. No GSAP, Lenis ni motor global. Grupo de descubrimiento nuevo para **Tipografía** y **Heroes**. Código de autoría ATREZZO; imágenes de demo sustituidas por composiciones CSS abstractas. Mantener el catálogo en `noindex` y no confundir QA de librería con certificación de cliente.

## ATREZZO TRANSITIONS 01: Veil · Split · Iris

Tres transiciones originales **entre páginas HTML**, no scroll: `ATZ-PGT-001`, `ATZ-PGT-002` y `ATZ-PGT-003`. Motor Web Animations API **sin GSAP ni Lenis**, con CSS y preflight originales preservados, 3 SVG ilustrativos originales, escenas independientes y ejemplo de navegación real en `catalog/page-transitions-demo/`. Usar solo el ID seleccionado y el preflight requerido; ver `ATREZZO-TRANSITIONS-01-INGEST-REPORT.md`.
