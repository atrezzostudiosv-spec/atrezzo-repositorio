# ATREZZO — Instrucciones operativas para IA

Este repositorio contiene **patrones**, no páginas completas para copiar. La verdad comercial, el diseño aprobado del cliente y los requisitos de accesibilidad prevalecen sobre el catálogo.

## Flujo obligatorio
1. Leer `registry/components.json` para encontrar el ID exacto, categoría, estado y comportamiento.
2. Consultar la ficha `technical_guide` del ID solicitado, no la descripción de una colección entera.
3. Auditar la estructura y dependencias del **repositorio del cliente** antes de incorporar código.
4. Si existen los campos `component_html`, `component_css`, `component_js` y `component_runtime`, **usar esos cuatro archivos aislados** para el ID solicitado. No importar el motor histórico ni las otras variantes. Consultar la fuente original únicamente para auditoría o corrección.
5. Adaptar paleta, fotografías autorizadas, copy real y dosis de movimiento M0–M3 a la marca. Nunca copiar sin criterio el conjunto de la demo.
6. Implementar fallback sin JavaScript y con `prefers-reduced-motion`; conservar scroll nativo y CTA accesibles.
7. Probar 375 / 768 / 1024 / 1440, móvil, teclado, scroll inverso, scroll rápido, errores JS, rendimiento e imágenes con licencia.
8. Registrar resultado en `ATREZZO-PROJECT-STATUS.md` del cliente. No declarar listo un efecto marcado `reference` o `validation` antes de su aprobación y verificación independiente.

## Cómo resolver una solicitud
Si dice “usa `ATZ-SCR-008`” significa **solo** el patrón `data-grid-seventh` y `animateSeventhGrid()`. No instalar las otras diez secuencias. No reemplazar ese movimiento por otro al interpretarlo.

## Licencias
Código original de Codrops incluido con licencia MIT en `sources/codrops-layout-formations/LICENSE`. Dependencias GSAP y ScrollTrigger, imágenes de demostración y fuentes deben verificarse por separado según su licencia y la implementación elegida.

## Demostración ≠ componente verificado
Las previews son muestras de una mecánica aislada. No certifican por sí solas estabilidad en un sitio de cliente ni accesibilidad de producción.

## Fase 3 — Importación autónoma
Para `ATZ-SCR-004`, usar `components/scroll/ATZ-SCR-004.html` + `components/runtime/atrezzo-motion.css` + `components/scroll/ATZ-SCR-004.js` (que importa `components/runtime/lifecycle.js`). La API del módulo individual es `mount(host,{gsap,ScrollTrigger})`; devolverá una instancia con `refresh()` y `destroy()`. Consulta `components/runtime/README.md`. Los 11 módulos siguen en `validation`, con `client_ready:false`.

## Fase 4 — Identificadores para ChatGPT

Leer `docs/AI-INTEGRATION-WORKFLOW.md`. Resolver el ID exacto en `registry/components.json`. Cuando exista terminal, `node scripts/resolve-component.mjs ATZ-SCR-008` devuelve el contrato JSON y `--prompt` la instrucción de integración. `node scripts/export-component.mjs ATZ-SCR-008 --out ./salida` prepara cuatro archivos aislados sin modificar el código del cliente. Demostración: `examples/ai-ATZ-SCR-008/`. No elegir otro ID, ni publicar una variante `validation` sin QA en cliente.

## Fase 5 — Navegación

Los IDs ATZ-NAV-001, ATZ-NAV-002 y ATZ-NAV-003 proceden de código original Atrezzo y no usan GSAP. Instalar solamente el HTML/CSS/JS del ID solicitado con `components/navegacion/runtime.js`, sin copiar otras variantes. Conservar navegación accesible sin JavaScript, scroll nativo, Escape, flechas o anclas según el patrón. No reutilizar las fotos originales de la demo sin licencia comercial.

## Sticky Sections 15: componentes aprobados por el usuario

El ZIP `ATREZZO_03_StickySections_15_MAC_LISTO(1).zip` aporta quince **efectos controlados por scroll**, identificados `ATZ-STK-001`…`ATZ-STK-015`. Son distintos de `ATZ-NAV-003`, que cambia de imagen mediante clic. Para cualquier STK importar **únicamente** `components/scroll/ATZ-STK-XXX.html`, `.js`, `components/runtime/atrezzo-sticky.css`, `components/runtime/sticky-lifecycle.js`; GSAP y ScrollTrigger deben estar disponibles. Respetar seis paneles, transformaciones y sincronización originales. La demo de origen usa Lenis global; no imponerlo sobre otros websites. Las imágenes de Annas Muslimin/Vecteezy del ZIP no están autorizadas automáticamente y se sustituyen por SVG abstractos en catálogo. **El diseño y movimiento aprobados son fuente maestra; no reinterpretar el efecto.**

## Scroll Sections 01–03 — nueve originales aprobados (2026-11-11)

Los IDs `ATZ-SEC-001…009` pertenecen al material original aprobado. Usar **solo** el fragmento, CSS, módulo y motor indicados por `registry/components.json` (`components/secciones/`). No instalar GSAP, Lenis ni ScrollSmoother: los motores son JavaScript nativo y utilizan scroll natural. Preservar las fórmulas de progreso y el diseño editorial del archivo original. Los SVG del catálogo son ilustrativos, no trabajos de clientes. `client_ready:false` hasta QA específica dentro de la web del cliente.

## Catalogación por comportamiento y favoritos (2026-11-11)

`discovery_group` identifica la familia funcional (galerias, sticky, narrativa, navegacion, transiciones); `discovery_trigger` diferencia scroll, clic y mixto. Estas etiquetas no alteran el movimiento original. `catalog_qa_status:passed_internal` permite mostrar «Demo probada» por las pruebas internas aprobadas; **no** significa `client_ready:true` (todos permanecen false). Los favoritos de `catalog/favorites-store.js` viven en `localStorage` del navegador, no en la cuenta ni GitHub, y no se sincronizan entre dispositivos. Elegir por ID exacto y ficha técnica, no por orden de tarjetas.

## ATREZZO Motion Library V1 — siete efectos extraídos (2026-11-11)

Los IDs `ATZ-MOT-001…007` provienen de los dos ZIP de la biblioteca Motion V1, cuyos motores JavaScript y CSS eran idénticos. Su código fuente fue autorizado en el proyecto de origen, pero sus medios no lo están automáticamente. Se incorporaron solo siete patrones visuales; no importar el runtime monolítico, menús, modales ni el bloqueador global de scroll, que tenía un defecto de multiinstancia documentado en `ATREZZO-MOTION-LIBRARY-V1-AUDIT.md`. Usar por ID solo HTML, JS y CSS declarados en el registro más `components/motion/runtime.js`. Los movimientos tipográficos, hero, parallax, journey y burned responden a scroll o entrada en pantalla según `discovery_trigger`. **Nunca publicar fotos o vídeo del cliente original.** Todos permanecen `client_ready:false`.

## ATREZZO TRANSITIONS 01 — Navegación REAL entre páginas (11/11/2026)

El usuario reentregó `ATREZZO_TRANSITIONS_01_COMPLETO(1).zip`, que coincide byte por byte con el ZIP anterior `ATREZZO_TRANSITIONS_01_COMPLETO.zip`. **Motor original propio, distinto de Codrops Interlude.** Tres IDs `ATZ-PGT-001` Veil, `002` Split, `003` Iris. Activación **por clic al navegar**, nunca scroll. Los archivos `components/page-transitions/runtime.js`, `atrezzo-transitions.css` y `preflight.js` son copias exactas de los originales. La preview usa `swap()` del motor; para webs HTML multipágina, instalar preflight en `<head>` y motor en todas las páginas con enlaces `data-atz-link`. Los 3 SVG y `showcase.css` son solo ilustraciones de catálogo. No marcar links externos, formularios, correo o anchors. No instalar interceptación global si el sitio usa router cliente o ya tiene otro sistema de transiciones. Cada integración requiere revisión de `AGENTS.md`, ficha individual, bfcache, CSS y reduced-motion. No confundir con `ATZ-TRN-001`, que es una salida de cabecera controlada por scroll.

## ATZ-SVC-001 — Extracción de proyecto Tri-Lane (2026-11-11)

La biblioteca añade un grupo **Composiciones de servicios**, separado de Scroll & Motion. Fuente real: `atrezzostudiosv-spec/tri-lane-roofing/index.html`, sección `.tl-wwd-section`, origen de la captura del usuario. Era una **demo comercial de Atrezzo**, no sitio oficial contratado ni trabajo publicado por cliente. Preservar geometría 1.24fr/1fr y 2x2 secundario, swipe horizontal con scroll-snap en ≤767px y revelado IntersectionObserver 700ms. Extraído como `ATZ-SVC-001`: HTML/CSS/JS/runtime propios, 5 ilustraciones SVG generadas para catálogo, NINGUNA foto de Tri-Lane. No copiar textos/servicios/claims de ejemplo en websites de otros clientes sin acreditación. La ficha `components/servicios/ATZ-SVC-001.md` documenta límites y breakpoints. No es un patrón de scroll pesado ni un nuevo template universal.


## Typography Collection 01 (2026-11-14)

ATZ-MOT-008, 010–015 utilizan exclusivamente sus archivos registrados en `components/typography/` (HTML, JS, `atrezzo-typography.css`, `runtime.js`). No importar Motion V1 ni otros IDs. No copiar recursos o código de TRIONN. Las demos fueron aprobadas por el usuario; `client_ready:false` hasta pruebas en cliente. No modificar el movimiento aprobado ni confundir QA de catálogo con producción.


## Regla de admisión y reutilización — 14/11/2026

El usuario confirma que los 56 componentes dentro del catálogo están aprobados. `registry/components.json` registra expresamente `library_approval.approved_ids`. Solo incorporar al catálogo público nuevos IDs con aprobación del usuario y QA interna verificadas; el laboratorio puede contener candidatos fuera del catálogo. Todo ID aprobado se utiliza directamente, por su código exacto y ficha, sin pedir otra aprobación ni reconstruirlo. `status` y `client_ready` son metadatos técnicos de validación en un sitio concreto, no una revocación de aprobación. El ejecutor (ChatGPT/Codex) se encarga de integrar y probar en destino sin cambiar diseño, movimiento, orden, IDs, favoritos ni otras decisiones aprobadas. La ficha y el prompt deben resolver archivos y dependencias exactos. La interfaz muestra «Aprobado» en lugar de advertencias ambiguas. No prometer QA de cliente sin evidencia.


## Microinteractions Collection 01 — 14/11/2026

El usuario aprobó ATZ-MIC-001…005. Usar únicamente los cuatro archivos registrados en `components/microinteractions/` del ID exacto, sin GSAP ni Lenis, sin modificar movimiento o diseño. Mantener cursor nativo, navegación táctil y teclado; `ATZ-MIC-005` es un gesto decorativo, no autoriza acciones críticas. Conservar alternativa de activación directa. Integración por ID aprobada sin repetir aprobación. No copiar código ni medios de TRIONN.


## Creative Transitions Collection 01 — 14/11/2026

El usuario aprobó ATZ-CTR-001…004. Usar los cuatro archivos registrados en `components/creative-transitions/` del ID exacto, sin GSAP ni Lenis. Mantener scroll nativo, contraste, opción de omitir la entrada de marca y retorno al índice con foco. Shared Element es FLIP dentro del documento, no un router. Expanding Mask queda descartado por cobertura de ATZ-MOT-005 y ATZ-PGT-003. No modificar efectos aprobados ni solicitar nueva aprobación. Sin recursos de TRIONN.


## Visual Library 2.0
La clasificación de `registry/visual-discovery.json` es transversal y editorial, nunca sustituye el registro maestro ni la auditoría de marca. El compositor exporta IDs y secciones, no autorización para alterar su comportamiento. El director por reglas propone, no genera hechos ni sustituye verificación. M0 puede no requerir ningún componente.

## Connected Portfolio — ATZ-SEC-010

Consultar `registry/components.json`, campo `source_approved_entries`. Original visual aprobado; QA autónoma pendiente. Resolver y exportar mediante los mismos scripts de la biblioteca. Paquete completo en `components/originales/trionn/ATZ-SEC-010/`; leer su README y manifest, usar `index.html` como página autónoma y `projects.json` para contenido. Conservar `engine.original.js`, Three.js r128 y licencia. Una instancia por documento; no rediseñar ni usar contenido del cliente original. No marcar como `client_ready` o `passed_internal` sin pruebas.

## Colección Originales — ATREZZO Component Extraction Pipeline V2 (16/11/2026)

Por instrucción del usuario, todas las nuevas extracciones de código original de TRIONN y otras fuentes autorizadas se almacenan aparte: `components/originales/<fuente>/<ATZ-ID>/`. No mezclar con los 65 componentes anteriores ni modificar sus IDs. El catálogo visual muestra la sección **Originales** con las mismas tarjetas, buscador, filtros, favoritos, + Proyecto, demo y Copiar IA. Mantener un ID estable. El registro `source_approved_entries` y el manifest del paquete alimentan genéricamente el resolver, exportador y catálogo; no crear integraciones especiales por ID. Cada extracción debe incluir código original, dependencias y licencias, demo autónoma, README y manifest exacto. Validar antes de entregar la preview, obtener una única aprobación visual y registrar QA real antes de declararlo listo. No distribuir medios ni fuentes sin autorización. No publicar automáticamente material del laboratorio no aprobado.

## Fidelidad de integración de Originales — contrato 1.1 (16/11/2026)

La prohibición de copiar código de TRIONN en las colecciones anteriores se refiere a sus IDs; no afecta a las extracciones autorizadas y registradas en `source_approved_entries`. Para Originales se debe usar el paquete exacto y autorizado. No confundir aprobación de laboratorio con fidelidad en destino.

Antes de integrar, abrir y ejecutar la demo registrada como referencia visual. Copiar el paquete completo y verificar el motor contra su fuente; no reconstruirlo. Mantener estructura DOM, geometría, capas, opacidad, tiempos, disparadores, composición espacial y comportamiento de ida y vuelta aprobados. Solo adaptar contenido, imágenes autorizadas y tokens de marca que no alteren el efecto. No añadir velos, máscaras, filtros, ocultaciones, escalados ni cambios de jerarquía que reduzcan o transformen el movimiento. Comparar la demo y la implementación en los mismos estados de scroll, viewport e interacción; registrar diferencias con capturas reales y corregirlas. Una prueba técnica o un hash idéntico no certifica fidelidad visual. No declarar integración completa si no se puede abrir la demo o verificar el destino. Si una adaptación cambia la composición o el efecto, presentarla aparte y obtener aprobación antes de aplicarla. No cambiar la ubicación solicitada: un laboratorio aislado no equivale a integrar en la página de destino.

Consultar `originals_integration_contract.visual_fidelity` y el `visual_contract` específico del ID cuando exista. Estos requisitos también se incluyen en Copiar IA, la partitura y la exportación por ID.

## Contrato de integración visual 1.2 — todas las colecciones

Aplicable a los 65 IDs anteriores, los Originales existentes y los futuros componentes. Fuente normativa: `registry/components.json` → `integration_contract`. Complementa las fichas técnicas y contratos particulares; no cambia diseños, IDs ni paquetes aprobados.

Antes de integrar, abrir y ejecutar la demo registrada como referencia visual. Copiar el paquete completo y verificar el motor contra su fuente; no reconstruirlo. Mantener estructura DOM, geometría, capas, opacidad, tiempos, disparadores, composición espacial y comportamiento de ida y vuelta aprobados. Solo adaptar contenido, imágenes autorizadas y tokens de marca que no alteren el efecto. No añadir velos, máscaras, filtros, ocultaciones, escalados ni cambios de jerarquía que reduzcan o transformen el movimiento. Comparar la demo y la implementación en los mismos estados de scroll, viewport e interacción; registrar diferencias con capturas reales y corregirlas. Una prueba técnica o un hash idéntico no certifica fidelidad visual. No declarar integración completa si no se puede abrir la demo o verificar el destino. Si una adaptación cambia la composición o el efecto, presentarla aparte y obtener aprobación antes de aplicarla. No cambiar la ubicación solicitada: un laboratorio aislado no equivale a integrar en la página de destino. Para todos los IDs, respetar la ficha técnica y las adaptaciones expresamente permitidas. Aislar CSS y preservar el movimiento; no alterar la composición para resolver conflictos. Si hay varios componentes, verificar orden, pinning, capas, dependencias y limpieza en el website completo. Una variación visual no aprobada no hereda la aprobación del ID. Para animaciones aleatorias comparar invariantes y comportamiento, no igualdad exacta de píxeles.

## Protocolo de extracción literal — Originales 2.1 (16/11/2026)

Regla de admisión obligatoria, anterior al contrato de integración 1.2. Fuente normativa: `registry/components.json` → `originals_extraction_contract`.

1. Originales significa extracción del efecto real, no reconstrucción visual, aproximación, versión inspirada ni sustitución del renderer.
2. Antes de separar un candidato, localizar su código, dependencias, DOM, CSS, recursos, disparadores y relación con efectos ya incorporados. Si es una capacidad de un componente existente, registrarla como extensión, sin crear un ID visual duplicado.
3. Ejecutar la referencia capturada original y la extracción privada con los mismos recursos autorizados, tamaños, estados e interacciones. Comparar capturas y movimiento; en audio, comprobar también eventos y reproducción. Registrar evidencia y diferencias. El código exacto por sí solo no acredita fidelidad.
4. Los adaptadores solo pueden resolver dependencias, montaje, ciclo de vida y rutas de recursos sin cambiar apariencia ni comportamiento. No sustituir shaders, canvas, WebGL, geometría, estilos estructurales, animaciones o composición por diagnósticos o simplificaciones.
5. Si falta código, recurso, dependencia o evidencia indispensable, marcar bloqueado/no verificable y explicar qué falta. No rellenar huecos con código inventado ni presentar una aproximación como original.
6. Una prueba diagnóstica puede usarse internamente, identificada como tal; nunca entregarla para aprobación como preview del efecto original ni incorporarla a Originales.
7. La versión pública solo admite sustituciones de medios necesarias por licencia o autorizadas, declaradas claramente como muestra; conservar composición, motor y comportamiento. No usar esa muestra como prueba de equivalencia visual con la captura privada. Si la sustitución altera el efecto, detener la publicación y solicitar aprobación específica.
8. No publicar una extracción hasta superar la comparación con la referencia original, la aprobación visual del usuario y la validación autónoma del paquete público. Los componentes ya aprobados mantienen sus IDs y sus estados de QA reales.

Caso 05 — Scroll Audio: rechazado como componente visual independiente; extensión de ATZ-SEC-010 pendiente. Prohibido reutilizar sus líneas diagnósticas como reemplazo del renderer original.
