# ATZ-MIC-002 — Contextual Cursor

**Aprobado por ATREZZO — disponible para integrar por ID. QA de catálogo aprobada: [244 comprobaciones Chromium](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/43609752012).**

**Función:** Indicador contextual que sigue el puntero y cambia según la zona.

**Activación:** Hover / cursor fino; touch y teclado usan enlaces nativos.

**Referencia y límites:** Captura Work escritorio 06:18–06:48; cursor contextual no aislado, propuesta propia. Implementación original de ATREZZO, no réplica exacta.

## Integración exacta
Copiar `components/microinteractions/ATZ-MIC-002.html`, `components/microinteractions/ATZ-MIC-002.js`, `components/microinteractions/runtime.js` y `components/microinteractions/atrezzo-microinteractions.css`. No copiar la demo completa. Insertar fragmento y CSS; importar `mount` desde el JS exacto, llamar `const instance = mount(contenedor);` y `instance.destroy()` al desmontar. CSS y runtime compartidos de la familia; no importar otros IDs. Sin dependencias externas. Adaptar contenido, tokens y enlaces #mi-result a destinos reales del proyecto sin modificar el movimiento. Verificar navegación, foco, touch, reduced motion y layout en destino.

**Licencias:** código y SVG de ejemplo originales de ATREZZO; no hay medios ni código de TRIONN. El estado técnico client_ready:false no invalida la aprobación de biblioteca.
