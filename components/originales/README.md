# ATREZZO — Originales

Colección separada de componentes extraídos de código original, por fuente e ID. No son reinterpretaciones ni sustituyen los componentes existentes.

## Estructura

- `trionn/ATZ-SEC-010/` — Connected Portfolio, original aprobado visualmente; QA autónoma pendiente.
- Próximas fuentes autorizadas: `<fuente>/<ATZ-ID>/`.

Cada paquete contiene su demo HTML, estilos, código, dependencias, documentación, licencias y manifest con el inventario íntegro. Las rutas se registran en `registry/components.json` → `source_approved_entries`. El catálogo visual agrupa estas entradas en Originales, con las mismas acciones que los demás componentes. El resolver y exportador aceptan IDs de esta colección mediante manifest, sin código especial por ID.

Flujo: extraer → empaquetar → validar → aprobar → integrar → cerrar. No confundir aprobación visual del original con QA autónoma ni con certificación de cliente.
