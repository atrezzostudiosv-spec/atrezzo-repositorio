# ATREZZO NAVIGATION 01 — Informe de ingesta

**Fecha:** 2026-11-10
**Origen:** `Atrezzo_Navigation_01_COMPLETO.zip` aportado en el proyecto ATREZZO WEBS.
**Identificación:** tres patrones individuales confirmados mediante revisión de HTML, CSS, JavaScript y documentación del ZIP.

| ID | Nombre | Patrón original | Dependencias externas | Estado |
|---|---|---|---|---|
| ATZ-NAV-001 | Immersive Menu | Menú en cortina con panel visual y trampa de foco | Ninguna | validation |
| ATZ-NAV-002 | Chapter Rail | Índice sticky, anclas y progreso de scroll | Ninguna | validation |
| ATZ-NAV-003 | Context Dock | Control flotante de proyectos, anterior/siguiente | Ninguna | validation |

## Qué se ha trasladado

- Funcionalidad nativa y contratos de hooks del ZIP original, reestructurados como **HTML + CSS + JS individual por ID**.
- Runtime compartido de limpieza/eventos `components/navegacion/runtime.js`.
- Previews integradas al catálogo existente sin modificar su dirección visual.
- IDs registrados en `registry/components.json`, disponibles por selección exacta desde ChatGPT.
- Fichas individuales con funcionamiento, recomendaciones, restricciones, accesibilidad y reglas de integración.

## Qué no se ha trasladado

- Las seis fotografías WebP y el HTML autónomo con imágenes incrustadas: la licencia comercial de esas fotografías **no está acreditada**. La demo en GitHub usa fondos abstractos provisionales y no pretende representar proyectos reales.
- No se importó el monolito IIFE original; cada ID instala únicamente su propia lógica.
- No se hizo ninguna modificación sobre repositorios de clientes.

## Comprobaciones

El ZIP original trae pruebas de Chromium y capturas locales de 375/390/768/1024/1440 px, pero solo acreditan su entorno de demo anterior. Esta adaptación **ha superado las pruebas internas**. [Node/selección por ID](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42805730542) y [Chromium UI/teclado/fallback](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42805730241) finalizaron correctamente. GitHub Pages publicó la versión: [deployment](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42805729582). Total biblioteca: 56 combinaciones (14 × 4), además de verificaciones de foco, Escape, inert, dock anterior/siguiente, rail, sin JS y reduced-motion.

## Pendiente para producción

Licencias de medios, fotografía autorizada, auditoría visual con medios reales, Safari/iOS, navegación entre rutas reales, y primera integración verificada en un website cliente. Ninguno de los tres ID es `client_ready`.

## Estado de continuidad

**Lote ATREZZO NAVIGATION 01: CERRADO A NIVEL INTERNO**. Esta fase solo confirma extracción por ID y QA Chromium. Los tres módulos se mantienen en `validation` y `client_ready:false` para webs de clientes. **Fase 5 principal EN PROCESO:** quedan 11 paquetes ZIP por auditar e incorporar. El siguiente lote recomendado es el HERO original de Elegant Massage, sin modificar el sitio del cliente.
