# ATREZZO — Originales

Colección separada de componentes extraídos de código original, por fuente e ID. No son reinterpretaciones ni sustituyen los componentes existentes.

## Estructura

- `trionn/ATZ-SEC-010/` — Connected Portfolio, original aprobado visualmente; QA autónoma pendiente.
- Próximas fuentes autorizadas: `<fuente>/<ATZ-ID>/`.

Cada paquete contiene su demo HTML, estilos, código, dependencias, documentación, licencias y manifest con el inventario íntegro. Las rutas se registran en `registry/components.json` → `source_approved_entries`. El catálogo visual agrupa estas entradas en Originales, con las mismas acciones que los demás componentes. El resolver y exportador aceptan IDs de esta colección mediante manifest, sin código especial por ID.

Flujo: extraer → empaquetar → validar → aprobar → integrar → cerrar. No confundir aprobación visual del original con QA autónoma ni con certificación de cliente.

- `trionn/ATZ-SEC-011/` — WebGL Image Wave, extracción 02. Original aprobado, QA privada correcta; QA pública independiente.

- `trionn/ATZ-SEC-012/` — Floating Portfolio, extracción 03. Original aprobado; validación pública independiente.

- `trionn/ATZ-SEC-013/` — Scroll Frame Sequence, extracción 04. Motor original, secuencia demostrativa propia; QA pública independiente.

## Protocolo de extracción literal — Originales 2.1 (16/11/2026)

Regla de admisión obligatoria, anterior al contrato de integración 1.2. Fuente normativa: `registry/components.json` → `originals_extraction_contract`.

1. Originales significa extracción del efecto real, no reconstrucción visual, aproximación, versión inspirada ni sustitución del renderer.
2. Antes de separar un candidato, localizar su código, dependencias, DOM, CSS, recursos, disparadores y relación con efectos ya incorporados. Si es una capacidad de un componente existente, registrarla como extensión, sin crear un ID visual duplicado.
3. Ejecutar la referencia capturada original y la extracción privada con los mismos recursos autorizados, tamaños, estados e interacciones. Comparar capturas y movimiento; en audio, comprobar también eventos y reproducción. Registrar evidencia y diferencias. El código exacto por sí solo no acredita fidelidad.
4. Los adaptadores solo pueden resolver dependencias, montaje, ciclo de vida y rutas de recursos sin cambiar apariencia ni comportamiento. No sustituir shaders, canvas, WebGL, geometría, estilos estructurales, animaciones o composición por diagnósticos o simplificaciones.
5. Si falta código, recurso, dependencia o evidencia indispensable, marcar bloqueado/no verificable y explicar qué falta. No rellenar huecos con código inventado ni presentar una aproximación como original.
6. Una prueba diagnóstica puede usarse internamente, identificada como tal; nunca entregarla para aprobación como preview del efecto original ni incorporarla a Originales.
7. La versión pública solo admite sustituciones de medios necesarias por licencia o autorizadas, declaradas claramente como muestra; conservar composición, motor y comportamiento. No usar esa muestra como prueba de equivalencia visual con la captura privada. Si la sustitución altera el efecto, detener la publicación y solicitar aprobación específica.
8. No publicar una extracción hasta superar la comparación con la referencia original, la aprobación visual del usuario y la validación autónoma del paquete público. Los componentes ya aprobados mantienen sus IDs y sus estados de QA reales.

Caso 05 — Scroll Audio: rechazado como componente visual independiente; extensión de ATZ-SEC-010 pendiente. Prohibido reutilizar sus líneas diagnósticas como reemplazo del renderer original.
