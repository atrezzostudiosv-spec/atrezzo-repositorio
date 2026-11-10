# ATREZZO COMPONENT LIBRARY — QA REPORT / FASE 3

**Fecha:** 2026-11-10
**Colección:** 10 animaciones de scroll + 1 transición de cabecera.
**Resultado:** Fase 3 cerrada para **aislamiento y validación interna de biblioteca**, no para publicación en sitios de clientes.

## Evidencia verificable

| Prueba | Resultado | Evidencia |
|---|---|---|
| Contrato de código / registro | APROBADO | https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42795290170 |
| Browser QA Chromium | APROBADO | https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42795290385 |
| Despliegue GitHub Pages | APROBADO (build) | https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42795290217 |

La batería de navegador ejecuta **44 pruebas de componente/viewport** (11 IDs × 375 / 768 / 1024 / 1440 px). Comprueba carga del HTML, número de tiles del patrón, ausencia de errores JavaScript, composición con altura, desbordamiento horizontal, scroll hacia adelante y regreso, presencia de una timeline por ID cuando corresponde y limpieza de ScrollTrigger con `destroy()`.

Otros controles: catálogo con 11 tarjetas, búsqueda y filtros, 375 px sin desbordamiento, `prefers-reduced-motion: reduce` (sin timeline), fallback estático con JavaScript deshabilitado y **dos componentes simultáneos en una página** (al desmontar uno, el segundo permanece activo).

Las capturas de las 11 previews en desktop, el catálogo desktop/móvil y el informe JSON se conservan como artifact `atrezzo-browser-qa` de la ejecución de GitHub Actions.

## Qué se ha cambiado

- Cada ID tiene `components/{scroll|transiciones}/<ID>.html` y `<ID>.js`, código separado de las otras variantes.
- Un único controlador compartido `components/runtime/lifecycle.js`, con `mount`, `refresh`, `destroy`.
- Estilos encapsulados en `components/runtime/atrezzo-motion.css`, sin selectores globales de marca.
- Preservación de las fuentes originales y licencia MIT del código fuente bajo `sources/codrops-layout-formations/`.
- Reparación de la llamada incorrecta a `calculateInitialTransform` en variante `ATZ-SCR-005`.
- Fotos de referencia de Codrops sustituidas por gradientes temporales; uso de fotografías comerciales exige autorización y optimización.
- El diseño aprobado del catálogo no se ha rediseñado.

## Límites y próximos controles obligatorios

1. **Integración real en web cliente:** validar conflictos de CSS, jerarquía, contenido real, imágenes autorizadas y su carga antes de cambiar un registro a `client_ready:true`.
2. **Auditoría visual humana:** GitHub toma capturas, pero las pruebas automáticas no sustituyen revisión estética de cada animación.
3. **Cross-browser:** Chromium comprobado; Safari (WebKit) y Firefox aún no verificados.
4. **Rendimiento real:** no hay Lighthouse o análisis Web Vitals bajo assets finales. 36 tiles con fotografías reales pueden exigir ajustes.
5. **Dependencias externas:** GSAP y ScrollTrigger deben quedar documentados y versionados en cada cliente; la biblioteca no incluye licencia para imágenes y fuentes de terceros.

**Regla de continuidad:** Fase 3 interna cerrada; los 11 IDs quedan `status:validation` y `client_ready:false`, hasta una prueba completa en contexto de producción. Próximo trabajo: FASE 4 — integración con ChatGPT por ID.
