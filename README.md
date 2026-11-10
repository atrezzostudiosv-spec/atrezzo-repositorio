# ATREZZO COMPONENT LIBRARY

Biblioteca centralizada y catálogo visual de patrones frontend para **ATREZZO WEBS**. No es una colección de templates: cada variante posee identidad, una demo individual, ficha técnica, procedencia y estado de validación.

## Acceso
- Catálogo visual: [catalog/index.html](catalog/index.html) (al habilitar GitHub Pages se publicará bajo `https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/`).
- Índice para agentes: [registry/components.json](registry/components.json).
- Instrucciones operativas: [AGENTS.md](AGENTS.md).
- Estado de fases: [ATREZZO-PROJECT-STATUS.md](ATREZZO-PROJECT-STATUS.md).

> GitHub Pages está configurado en **main / (root)**. Su funcionamiento público completo no está verificado automáticamente desde este entorno.

## Organización

```
catalog/                     Catálogo con filtros y previews individuales
registry/components.json     Inventario estructurado para ChatGPT
registry/intake.json         Material recibido pendiente de ingestión
components/scroll/           HTML + JS por cada ID (10 scrolls) + fichas técnicas\ncomponents/transiciones/    HTML + JS por cada ID (1 transición)\ncomponents/runtime/         lifecycle.js (instalación/desmontaje individual) + CSS encapsulado
sources/codrops-layout-formations/
  index.html                 HTML original bajo licencia MIT
  css/base.css               CSS original
  js/index.js                JS original (fuente de referencia)
  js/pattern-engine.js       Archivo histórico, no usar en nuevas integraciones
  LICENSE                    Licencia original de código
AGENTS.md                    Contrato de selección e integración IA
```

## Cómo pedir un movimiento concreto

**Ejemplo:** “En la página About de este cliente utiliza el componente `ATZ-SCR-004` para la galería de proyectos. Consulta `registry/components.json` y `components/scroll/ATZ-SCR-004.md`; importa **solo** ese patrón, respeta la identidad aprobada y comprueba reduced-motion, móvil y scroll inverso.”

**No basta** con pedir “ponle la animación del ZIP”. Para reproducir el efecto se requiere la estructura DOM, CSS, JS, dependencias y pruebas.

## Estados
- `reference`: referencia identificada y atribuida; no habilitada automáticamente para clientes.
- `validation`: aislada o adaptada, pero pendiente de pruebas completas.
- `ready`: verificada con criterios técnicos y aprobación visual.
- `deprecated`: conservada por trazabilidad, no reutilizar.

## Política
No copiar el layout completo de una demo ni asumir autorización comercial de fotografías/fuentes. No inventar testimonios, proyectos, equipo o datos del cliente. No forzar scroll, respetar `prefers-reduced-motion`, verificar 375/768/1024/1440 px, navegar por teclado y mantener el contenido visible sin JS.

**Origen del primer paquete:** Codrops, *On-Scroll Layout Formations*, © 2024, licencia MIT para el código. Imágenes de demostración externas: **solo referencia visual**, derechos de uso comercial no certificados.

## Fase 3 — Código independiente por componente
Los 11 IDs cuentan ahora con archivos `.html` y `.js` propios. Solo comparten `components/runtime/lifecycle.js` y `components/runtime/atrezzo-motion.css`. Cada módulo activa **una** timeline y ofrece `mount(host,{gsap,ScrollTrigger})`, `refresh()` y `destroy()`. Consulta [guía de integración](components/runtime/README.md). Estado: `validation` hasta completar pruebas reales de navegador y en proyectos clientes.

## Fase 4 — Selección con ChatGPT

Consulta [contrato IA](docs/AI-INTEGRATION-WORKFLOW.md). `node scripts/resolve-component.mjs ATZ-SCR-008` devuelve un solo ID; añade `--prompt` para la instrucción de ChatGPT. `node scripts/export-component.mjs ATZ-SCR-008 --out ./salida` prepara la copia independiente para integrarla más tarde en un cliente. [Laboratorio autónomo](examples/ai-ATZ-SCR-008/). No modifica automáticamente ninguna web comercial.

## Fase 4 — Resultado técnico

La resolución estricta y la exportación de un único ID superaron CI. La [página de laboratorio](examples/ai-ATZ-SCR-008/) pasó pruebas Chromium con un módulo y estilos anfitriones independientes. Ver [informe de Fase 4](ATREZZO-PHASE4-REPORT.md). La integración real con clientes aún requiere auditoría y autorización específica.
