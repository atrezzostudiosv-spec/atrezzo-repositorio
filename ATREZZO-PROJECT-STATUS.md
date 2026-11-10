# ATREZZO PROJECT STATUS — Component Library

**Fecha:** 2026-11-10

| Fase | Estado | Evidencia |
|---|---|---|
| Auditoría del repositorio | CERRADA | El repositorio se inició vacío, sin código previo |
| Auditoría ZIP On-Scroll Layout Formations | CERRADA | 10 patrones de grid + 1 efecto de cabecera identificados y fichados |
| Arquitectura de IDs, categorías e instrucciones IA | EN VALIDACIÓN | Registro JSON, 11 fichas y AGENTS.md disponibles; probar integración en un repositorio cliente |
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

**Estado: EN PRUEBAS.** Se han incorporado `scripts/resolve-component.mjs`, `scripts/export-component.mjs`, `docs/AI-INTEGRATION-WORKFLOW.md` y el laboratorio `examples/ai-ATZ-SCR-008/`. La prueba automatizada comprueba que un ID seleccionado no importa otros efectos y que no sobrescribe código del cliente. Cierre sujeto al resultado de GitHub Actions y a confirmar el funcionamiento del laboratorio.
