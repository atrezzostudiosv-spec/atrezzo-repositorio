# ATZ-MOT-008 — Blur Text Reveal

**Origen:** paquete ATREZZO Typography Collection 01 aprobado el 14/11/2026; implementación original, referencia de comportamiento TRIONN (grabaciones públicas y artículo técnico). No contiene código ni recursos de TRIONN.

**Estado:** validation; client_ready:false. QA interna del catálogo aprobada (Chromium, 224 comprobaciones globales). [Evidencia](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/43605004934).

**Activación:** scroll-entry. **Movimiento:** Letras, palabras y líneas: foco progresivo aleatorio.

**Evidencia:** Home 02:42 escritorio; artículo técnico: blur 12 px, 800 ms, stagger 80 ms, capa 500 ms. No se certifica una coincidencia exacta.

**Uso:** Titulares editoriales y declaraciones de marca. No utilizar para contenido crítico si retrasa lectura o interacción.

## Integración por ID
- `components/typography/ATZ-MOT-008.html`
- `components/typography/atrezzo-typography.css`
- `components/typography/ATZ-MOT-008.js`
- `components/typography/runtime.js`

Importar únicamente estos cuatro archivos. Insertar el fragmento HTML y cargar el CSS. Importar `mount` desde el módulo exacto y llamar `mount(host)`; devuelve `refresh()` y `destroy()`. Sin dependencias externas. Mantener el alcance .atz-ty y sus selectores. Servir mediante HTTP. Sustituir copy y tokens de color de acuerdo con el proyecto; los enlaces #next son de ejemplo, sustituir por destinos reales. Desmontar al salir de la página. Contenido visible sin JS y reduced-motion. Validar integración, foco, scroll y responsive 375/768/1024/1440 antes de producción.
