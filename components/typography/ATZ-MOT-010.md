# ATZ-MOT-010 — Rotating Words

**Origen:** paquete ATREZZO Typography Collection 01 aprobado el 14/11/2026; implementación original, referencia de comportamiento TRIONN (grabaciones públicas y artículo técnico). No contiene código ni recursos de TRIONN.

**Estado:** validation; client_ready:false. QA interna del catálogo aprobada (Chromium, 224 comprobaciones globales). [Evidencia](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/43605004934).

**Activación:** visibility / time. **Movimiento:** Una palabra se disuelve y otra aparece, sin mover la composición.

**Evidencia:** Home 02:00–02:33 escritorio; móvil 8.65–32.97 s; cadencia propuesta. No se certifica una coincidencia exacta.

**Uso:** Titulares breves con una palabra variable. No utilizar para contenido crítico si retrasa lectura o interacción.

## Integración por ID
- `components/typography/ATZ-MOT-010.html`
- `components/typography/atrezzo-typography.css`
- `components/typography/ATZ-MOT-010.js`
- `components/typography/runtime.js`

Importar únicamente estos cuatro archivos. Insertar el fragmento HTML y cargar el CSS. Importar `mount` desde el módulo exacto y llamar `mount(host)`; devuelve `refresh()` y `destroy()`. Sin dependencias externas. Mantener el alcance .atz-ty y sus selectores. Servir mediante HTTP. Sustituir copy y tokens de color de acuerdo con el proyecto; los enlaces #next son de ejemplo, sustituir por destinos reales. Desmontar al salir de la página. Contenido visible sin JS y reduced-motion. Validar integración, foco, scroll y responsive 375/768/1024/1440 antes de producción.
