# ATZ-MOT-015 — Glyph Layer Swap

**Origen:** paquete ATREZZO Typography Collection 01 aprobado el 14/11/2026; implementación original, referencia de comportamiento TRIONN (grabaciones públicas y artículo técnico). No contiene código ni recursos de TRIONN.

**Estado:** validation; client_ready:false. QA interna del catálogo aprobada (Chromium, 224 comprobaciones globales). [Evidencia](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/43605004934).

**Activación:** hover / focus. **Movimiento:** Cambio horizontal de capas de letras escalonadas al interactuar con un enlace.

**Evidencia:** Móvil text-layer clone y desplazamientos X; hover original no aislado, implementación propuesta. No se certifica una coincidencia exacta.

**Uso:** Enlaces y navegación editorial con hover y foco. No utilizar para contenido crítico si retrasa lectura o interacción.

## Integración por ID
- `components/typography/ATZ-MOT-015.html`
- `components/typography/atrezzo-typography.css`
- `components/typography/ATZ-MOT-015.js`
- `components/typography/runtime.js`

Importar únicamente estos cuatro archivos. Insertar el fragmento HTML y cargar el CSS. Importar `mount` desde el módulo exacto y llamar `mount(host)`; devuelve `refresh()` y `destroy()`. Sin dependencias externas. Mantener el alcance .atz-ty y sus selectores. Servir mediante HTTP. Sustituir copy y tokens de color de acuerdo con el proyecto; los enlaces #next son de ejemplo, sustituir por destinos reales. Desmontar al salir de la página. Contenido visible sin JS y reduced-motion. Validar integración, foco, scroll y responsive 375/768/1024/1440 antes de producción.
