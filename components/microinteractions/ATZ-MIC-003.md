# ATZ-MIC-003 — CTA Arrow & Fill

**Aprobado por ATREZZO — disponible para integrar por ID. QA de catálogo aprobada: [244 comprobaciones Chromium](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/43609752012).**

**Función:** Fondo ascendente y flecha diagonal de doble capa; texto permanece legible.

**Activación:** Hover y foco; transición CSS, enlace nativo sin JS.

**Referencia y límites:** Muestras móvil de controles btn/button-text; transición de 300 ms de cabecera, coordinación propuesta. Implementación original de ATREZZO, no réplica exacta.

## Integración exacta
Copiar `components/microinteractions/ATZ-MIC-003.html`, `components/microinteractions/ATZ-MIC-003.js`, `components/microinteractions/runtime.js` y `components/microinteractions/atrezzo-microinteractions.css`. No copiar la demo completa. Insertar fragmento y CSS; importar `mount` desde el JS exacto, llamar `const instance = mount(contenedor);` y `instance.destroy()` al desmontar. CSS y runtime compartidos de la familia; no importar otros IDs. Sin dependencias externas. Adaptar contenido, tokens y enlaces #mi-result a destinos reales del proyecto sin modificar el movimiento. Verificar navegación, foco, touch, reduced motion y layout en destino.

**Licencias:** código y SVG de ejemplo originales de ATREZZO; no hay medios ni código de TRIONN. El estado técnico client_ready:false no invalida la aprobación de biblioteca.
