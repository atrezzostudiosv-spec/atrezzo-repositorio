# ATREZZO PROJECT STATUS — Component Library

**Fecha:** 2026-11-10

| Fase | Estado | Evidencia |
|---|---|---|
| Auditoría del repositorio | CERRADA | El repositorio se inició vacío, sin código previo |
| Auditoría ZIP On-Scroll Layout Formations | CERRADA | 10 patrones de grid + 1 efecto de cabecera identificados y fichados |
| Arquitectura de IDs y contrato de selección IA | VALIDADA INTERNAMENTE | 11 IDs resueltos por coincidencia exacta; exportación segura de una única variante, manifest y guías verificados en CI. Integración en web cliente real pendiente |
| Dirección visual del catálogo | APROBADA / CERRADA | Usuario aprueba expresamente la estética de la biblioteca el 2026-11-10. Diseño protegido; no rediseñar durante validaciones técnicas |
| FASE 2 — Catálogo y validación funcional | APROBADA POR EL USUARIO | El usuario aprueba expresamente la validación funcional el 2026-11-10. La aceptación no equivale a auditoría técnica independiente ni a certificación de las 11 variantes |
| Ingesta de otros ZIP | PENDIENTE | 12 paquetes inventariados; no certificados |
| FASE 3 — Aislamiento y validación interna | CERRADA / VALIDADA | 11 HTML + 11 módulos JS únicos, lifecycle compartido, CSS encapsulado. Tests Node y Chromium de GitHub Actions APROBADOS: 44 combinaciones, 4 anchos, scroll inverso, reduced-motion, sin JS, doble instancia y desmontaje. Evidencia en ATREZZO-QA-REPORT.md |
| Publicación GitHub Pages | DESPLEGADA (CI) | GitHub Actions pages build and deployment completado satisfactoriamente; comprobación pública directa desde este chat restringida; navegador de CI valida una copia local del repositorio |

**Decisión cerrada:** una variante = ID persistente + preview individual + ficha técnica + función concreta del origen.

**Cierre de continuidad:** la Fase 2 queda aprobada por el usuario (diseño y aceptación funcional). Los ajustes de Fase 3 deben preservar el diseño aprobado y no confundir la aceptación del usuario con certificación técnica.

**Fase 3 cerrada a nivel biblioteca:** 11/11 variantes separadas; 44 combinaciones de prueba de navegador más escenario de dos instancias; suites internas y GitHub Pages con ejecución verde. No se reabre el diseño Fase 2.

**Pendiente fuera del cierre interno:** revisión editorial manual de capturas, rendimiento con fotografías reales, validación cross-browser (Safari/Firefox), y la **primera integración en un sitio cliente**. Por ello `status: validation` y `client_ready: false` siguen siendo obligatorios en los 11 registros. Nunca confundir una prueba de biblioteca con certificación de producción.

**Siguiente fase:** FASE 4 — Verificar que ChatGPT elija e integre correctamente un componente por ID, sin traer el paquete completo ni modificar diseños aprobados.

## Fase 4 — Contrato con ChatGPT

**Estado: CERRADA — VALIDACIÓN INTERNA.** Implementado `scripts/resolve-component.mjs` para 11/11 IDs, `scripts/export-component.mjs` para exportación sin sobrescritura y `docs/AI-INTEGRATION-WORKFLOW.md` como protocolo para ChatGPT. Laboratorio `examples/ai-ATZ-SCR-008/` validado con Chromium a 375/768/1024/1440 px, importando solo su módulo; fallback sin JS y desmontaje verificados. Evidencia: [pruebas de contrato](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42801875846), [pruebas de navegador](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42801875815) y [despliegue Pages](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42801874386).


**Límite de Fase 4:** no se ha realizado una prueba de obediencia del modelo en otro chat ni una implementación en un repositorio de cliente. El contrato es consultable y el exportador es determinista, pero ChatGPT debe leerlo y tener acceso a GitHub. `client_ready:false` permanece vigente.

**Próximo paso estratégico:** FASE 5 — inventariar los otros ZIP, deduplicar, asignar IDs individuales e incorporar por lotes sin perder la arquitectura ni el diseño aprobado. Priorizar clasificación antes de carga indiscriminada.

## Fase 5 — Navegación original

**LOTE CERRADO — VALIDACIÓN INTERNA.** ZIP original `Atrezzo_Navigation_01_COMPLETO.zip` auditado; 3 componentes `ATZ-NAV-001`, `ATZ-NAV-002`, `ATZ-NAV-003` importados individualmente (HTML/CSS/JS, runtime nativo sin GSAP). Catálogo: **14 IDs, 3 categorías**, sin rediseñar las secciones aprobadas. GitHub Actions: [pruebas de código APROBADAS](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42805730542), [navegador Chromium APROBADO](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42805730241), [Pages desplegado](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42805729582). Incluye 56 combinaciones de viewport (11 scroll + 3 navegación × 4 anchos), teclado/foco de menú, sin JS y movimiento reducido. **Fase 5 general continúa EN PROCESO:** quedan 11 ZIP por clasificar e integrar. Los 3 NAV siguen `client_ready:false` por falta de fotos autorizadas, validación manual Safari/iOS e integración en cliente.
