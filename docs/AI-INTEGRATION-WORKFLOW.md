# ATREZZO — Contrato de integración IA por ID

**Fase 4 · 2026-11-10**. Este procedimiento permite seleccionar un componente sin repetir los criterios de dirección artística en cada proyecto.

## Instrucción natural para ChatGPT

> En el sitio del cliente, integra el componente `ATZ-SCR-008` del repositorio ATREZZO. Primero audita su código, lee `AGENTS.md`, `registry/components.json` y la ficha exacta del ID. Instala solo la variante seleccionada, conserva el diseño aprobado y verifica responsive, scroll y accesibilidad.

## Protocolo obligatorio

1. Resolver `id` por coincidencia **exacta** en `registry/components.json`. Nunca inferir otro ID a partir de un nombre parecido.
2. Consultar `technical_guide` y los campos `component_html`, `component_css`, `component_js`, `component_runtime`. Importar **únicamente esos cuatro archivos**, no el motor histórico completo.
3. Revisar el repositorio del cliente antes de editar: arquitectura, estilos, componentes aprobados, dependencias existentes, scroll, SEO y fuentes fotográficas.
4. Adaptar el componente a la identidad y contenido confirmados; no copiar demos, fotografías o claims de terceros. Preservar los selectores y nodos necesarios para el efecto.
5. Instalar GSAP y ScrollTrigger conforme a las licencias aplicables. Mantener scroll nativo, fallback sin JavaScript y compatibilidad `prefers-reduced-motion`.
6. Probar 375, 768, 1024 y 1440 px, teclado, scroll rápido y reverso, montaje/desmontaje, ausencia de errores JS y rendimiento.
7. Documentar los archivos modificados, pruebas realizadas, estado y evidencias. `client_ready:false` significa que no está certificado para clientes, incluso si su demo funciona.
8. No modificar sitios de clientes sin tener acceso a su repositorio y una solicitud concreta de integración.

## Selección determinista y exportación segura

- `node scripts/resolve-component.mjs ATZ-SCR-008` devuelve el manifiesto JSON de **un único ID**.
- `node scripts/resolve-component.mjs ATZ-SCR-008 --prompt` devuelve las instrucciones correspondientes listas para ChatGPT.
- `node scripts/export-component.mjs ATZ-SCR-008 --out ./salida` copia únicamente los cuatro archivos funcionales y la licencia de la fuente a `./salida/atrezzo/`. No edita páginas existentes ni sobrescribe otra exportación.

## Prueba sin tocar un cliente

La página [Laboratorio ATZ-SCR-008](../examples/ai-ATZ-SCR-008/) contiene una estructura anfitriona distinta e incorpora exclusivamente ese movimiento. Debe probarse en CI antes de cerrar la fase. Es **un laboratorio**, no una web comercial.

## Límite

Este contrato hace que los archivos sean localizables e importables por cualquier asistente **que lea las instrucciones y tenga acceso al repositorio**. No permite afirmar que ChatGPT conectará automáticamente la biblioteca desde cualquier chat sin consultar esas fuentes.
