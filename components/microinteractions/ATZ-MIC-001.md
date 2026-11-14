# ATZ-MIC-001 — Magnetic Button

**Aprobado por ATREZZO — disponible para integrar por ID tras QA del catálogo.**

**Función:** Magnetismo suave en CTA sin desplazar su área de clic.

**Activación:** Hover / cursor fino; foco y touch conservan el enlace normal.

**Referencia y límites:** Referencia conceptual: logo magnético 3D de TRIONN; adaptación 2D propia, trayectoria no medida. Implementación original de ATREZZO, no réplica exacta.

## Integración exacta
Copiar `components/microinteractions/ATZ-MIC-001.html`, `components/microinteractions/ATZ-MIC-001.js`, `components/microinteractions/runtime.js` y `components/microinteractions/atrezzo-microinteractions.css`. No copiar la demo completa. Insertar fragmento y CSS; importar `mount` desde el JS exacto, llamar `const instance = mount(contenedor);` y `instance.destroy()` al desmontar. CSS y runtime compartidos de la familia; no importar otros IDs. Sin dependencias externas. Adaptar contenido, tokens y enlaces #mi-result a destinos reales del proyecto sin modificar el movimiento. Verificar navegación, foco, touch, reduced motion y layout en destino.

**Licencias:** código y SVG de ejemplo originales de ATREZZO; no hay medios ni código de TRIONN. El estado técnico client_ready:false no invalida la aprobación de biblioteca.
