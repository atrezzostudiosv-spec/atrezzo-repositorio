# ATREZZO Motion Library v1 — Auditoría para incorporar a la biblioteca

**Fecha:** 11 de noviembre de 2026  
**Origen:** `ATREZZO_MOTION_COMPONENTES_PARA_WEB_V1.zip` y `ATREZZO_MOTION_LIBRARY_V1_COMPLETA.zip`.  
**Decisión:** **APTO COMO FUENTE PARA MODULARIZACIÓN Y VALIDACIÓN**, **NO APTO PARA SUBIR ÍNTEGRO COMO 35 COMPONENTES LISTOS**. No se han añadido componentes nuevos al registro a consecuencia de esta auditoría.

## 1. Identidad y alcance

Los dos archivos comparten **byte por byte** el motor `atrezzo-motion.js` (SHA-256 `a2df97602ab48c6c4cf7b2eadb3c27c2571db829c78ad82e5e6987b5a7fed7cd`) y la hoja `atrezzo-motion.css` (SHA-256 `092f47c92c6c3c015bef2bcba36e5108c438c61e12de78f913c531e78206f4c9`). El ZIP para web tiene los dos archivos y un LEEME; el completo tiene, además, docs, demos Home/Weddings, tests, referencias y **10 medios de demo**.

El paquete completo define **35 ítems de una matriz de movimientos**, pero la documentación técnica los agrupa en **15 familias funcionales**. Las 35 observaciones NO son 35 componentes independientes ni 35 piezas validadas. El ítem 31 está documentado como texto sin animación específica y no genera componente.

El código declara ser una implementación original de patrones documentados mediante ingeniería inversa pública autorizada de Spain Collection. No incluye el JavaScript minificado ni tema WordPress del sitio observado. Esa declaración procede de la fuente; no constituye verificación jurídica independiente.

## 2. Qué conviene incorporar

### Prioridad editorial, selección inicial

1. **TextReveal**: revelado progresivo de caracteres al entrar en viewport.
2. **TextScrub**: avance tipográfico sincronizado directamente con el scroll (variante distinta del anterior).
3. **ImageParallax**: desplazamiento de fotografía sin reemplazar scroll nativo.
4. **HomeHeroCollage**: hero fotográfico de seis medios, con transformaciones vinculadas a scroll.
5. **WeddingsHero**: apertura progresiva de una ventana visual mediante clip y scroll (el nombre de producción debe ser agnóstico al sector).
6. **WeddingJourney**: pasos editoriales y cambio de escena por scroll (renombrar descriptivamente para otros sectores).
7. **BurnedImage**: fotografía con cambios de contraste, brillo, sepia y traslación al desplazarse.

Estos siete son **candidatos**, todavía sin ID ni preview aprobada. Antes de asignar ID, confirmar que su cinemática no duplica una variante ya publicada (`ATZ-SCR`, `ATZ-STK` o `ATZ-SEC`).

### Incluir solo tras comparar o rediseñar su aislamiento

- **StackedCards**: se solapa conceptualmente con la familia Sticky Sections (`ATZ-STK-001…015`); verificar movimiento y DOM antes de crear otra tarjeta.
- **CTAReveal, FooterProgress**: interacciones auxiliares; pueden ser utilidades, no necesariamente tarjetas completas de catálogo.
- **DestinationCards / AmbassadorCards**: efectos de entrada o hover/carrusel, **no** scroll storytelling puro; clasificarlos por interacción real.
- **ScrollVideo**: utilidad de reproducción condicionada a viewport, no efecto fotográfico independiente.
- **MobileNavigation, Video/InfoModal, PageWipe**: requieren aislamiento de overlays, bloqueo de scroll, foco y rutas; el usuario debe aprobar su UX específica antes de sustituir elementos existentes.

## 3. Controles realizados con los archivos proporcionados

- Manifiesto del ZIP completo: **29/29** rutas, tamaños y hashes SHA-256 coinciden.
- `node --check`: **PASS**.
- `node --test tests/math.test.mjs`: **6/6 PASS**.
- `python3 tests/validate_static.py`: **5/5 PASS**.
- Chromium: **6/6 pruebas funcionales alternativas con DOM cargado en memoria**: hero con scroll, textos, modal y Escape, navegación móvil 375 px, tablet 768 px sin overflow, reduced-motion, hero Weddings por scroll y desmontaje. Estas pruebas sustituyeron temporalmente las fotos por SVG abstractos y no abarcaron navegación real entre páginas.
- `tests/run_smoke.py` original: **0/6 ejecuciones realizadas** por `ERR_BLOCKED_BY_ADMINISTRATOR` al intentar abrir HTTP local. **No se consideran 6 fallos de la biblioteca** ni seis pruebas aprobadas.

### Defecto reproducido: coordinación de overlays

Al iniciar dos instancias distintas con un modal abierto en cada una, la primera instancia cerrada elimina la clase global `html.am-scroll-locked` pese a que el segundo modal sigue abierto. Se reprodujo en Chromium: `bothOpen=true; lockBefore=true; lockAfter=false; bStillOpen=true`.

**Condición obligatoria:** crear un gestor de bloqueo de scroll compartido entre instancias, y asegurar liberación correcta de foco, listeners y estados de overlay. Revisar además el selector global `:root` del CSS y la transición `PageWipe` que intercepta navegación interna.

## 4. Límites, licencias y diseño

- `dist/` sí puede servir de **referencia técnica reusable**, una vez modularizado y corregido.
- `demo/assets/` **no debe subirse al catálogo público de Atrezzo**: fotos y vídeo proceden del material exclusivo autorizado del proyecto Spain Collection. La documentación lo restringe expresamente.
- **No** importar `demo/index.html` ni `demo/weddings.html` como templates de clientes.
- Los parámetros del movimiento son en parte aproximaciones a partir de una matriz, **no** paridad visual exacta verificada con Spain Collection.
- No usar un solo `initAtrezzoMotion(document)` para alterar involuntariamente todas las secciones del cliente. Crear módulos separados por ID, CSS aislado y `mount()/destroy()` por instancia.
- No activar `PageWipe`, navegación, modales ni clase de bloqueo global sin inspeccionar el código existente y obtener pruebas de coexistencia.
- Probar 375, 768, 1024, 1101 y 1440 px (idealmente 1920), scroll inverso, movimiento reducido, interacción con teclado, Safari/Firefox y rendimiento antes de declarar `client_ready:true`.

## 5. Estado y siguiente paso

**Auditoría cerrada; integración no iniciada.** La biblioteca existente conserva sus **38 componentes**. Ningún componente `ATREZZO Motion v1` se ha registrado, publicado ni declarado listo para clientes por esta auditoría.

**Ruta elegida:** preparar por separado los **siete candidatos visuales prioritarios**, con fotografía abstracta de prueba y códigos independientes, compararlos con IDs existentes, integrarlos en rama de staging y ejecutar GitHub Actions de navegador. Solo después de QA y revisión visual se añadirán al catálogo bajo sus propios IDs.

**No modificar** diseños ya aprobados ni reutilizar medios del cliente original.
