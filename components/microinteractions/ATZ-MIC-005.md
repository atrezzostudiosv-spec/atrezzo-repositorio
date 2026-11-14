# ATZ-MIC-005 — Press & Hold

**Aprobado por ATREZZO — disponible para integrar por ID tras QA del catálogo.**

**Función:** Pulsación sostenida con progreso circular, cancelación y confirmación.

**Activación:** Pointer, Space o Enter; activación directa alternativa; enlace sin JS.

**Referencia y límites:** Referencia conceptual hold-to-blast; gesto separado de WebGL, 1200 ms propuestos. Implementación original de ATREZZO, no réplica exacta.

## Integración exacta
Copiar `components/microinteractions/ATZ-MIC-005.html`, `components/microinteractions/ATZ-MIC-005.js`, `components/microinteractions/runtime.js` y `components/microinteractions/atrezzo-microinteractions.css`. No copiar la demo completa. Insertar fragmento y CSS; importar `mount` desde el JS exacto, llamar `const instance = mount(contenedor);` y `instance.destroy()` al desmontar. CSS y runtime compartidos de la familia; no importar otros IDs. Sin dependencias externas. Adaptar contenido, tokens y enlaces #mi-result a destinos reales del proyecto sin modificar el movimiento. Escuchar `atz:hold-complete` en el contenedor; el evento es decorativo y no autoriza operaciones críticas. El enlace directo debe conservar un destino real sin JS. Verificar navegación, foco, touch, reduced motion y layout en destino.

**Licencias:** código y SVG de ejemplo originales de ATREZZO; no hay medios ni código de TRIONN. El estado técnico client_ready:false no invalida la aprobación de biblioteca.
