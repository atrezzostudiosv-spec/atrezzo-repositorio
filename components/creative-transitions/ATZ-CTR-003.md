# ATZ-CTR-003 — Cinematic Brand Entry

**Estado:** candidato en revisión visual, fuera del catálogo.

**Activación:** Entrada automática, repetir y omitir.

**Propósito:** Presentación de marca breve, no bloqueante, sin porcentaje ficticio de carga.

**Referencia:** Escritorio 00:00–00:09 y 02:36–02:42; entrada observada, diseño y tiempos originales.

**Diferenciación:** ATZ-PGT-001 es navegación entre páginas, ATZ-MOT-005 es hero por scroll. Este patrón se activa al montar la escena, no al navegar ni al hacer scroll.

## Integrar exactamente
Copiar `ATZ-CTR-003.html`, `ATZ-CTR-003.js`, `runtime.js` y `atrezzo-creative-transitions.css` desde esta carpeta. Insertar el fragmento, cargar el CSS y ejecutar `import {mount} from './ATZ-CTR-003.js'; const instance = mount(contenedor);`. Desmontar con `instance.destroy()`; `refresh()` reinicia el componente. No copiar otros IDs ni el laboratorio. Adaptar texto, tokens y medios propios; no cambiar mecánica aprobada. Sin dependencias externas. Los SVG son originales de ejemplo, no proyectos reales.

**Límites:** Entrada decorativa al montar, no sistema de medición de carga. La duración está limitada a 1,2 s nominales; Escape, foco en contenido u Omitir cancelan. No intercepta navegación.

**Validar en destino:** 375/768/1024/1440, teclado, touch, reduced motion, sin JS, interacción con header y contenido real. No declarar client_ready sin comprobar proyecto.
