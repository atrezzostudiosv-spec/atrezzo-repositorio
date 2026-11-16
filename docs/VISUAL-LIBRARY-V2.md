# ATREZZO Visual Library 2.0 — diseño de descubrimiento
Estado: EN VALIDACIÓN. La nueva interfaz es una capa adicional, no una reimplementación de componentes.
- Registro maestro: registry/components.json. Los 65 IDs y sus archivos aprobados permanecen intactos.
- Clasificación transversal: registry/visual-discovery.json. Las industrias, roles, estilos y niveles son valoraciones editoriales iniciales. El negocio real tiene prioridad; M0 no obliga a usar un componente.
- Visual: catalog/index.html (ruta principal). catalog/technical.html conserva el catálogo anterior; visual.html es un alias. Las capturas/grabaciones se producen a partir de la preview real y se enumeran en catalog/previews/manifest.json; sin archivo verificado, se muestra un estado explícito y se ofrece la demo.
- Project Composer: varios proyectos locales, orden y sección, exportación JSON y prompt. No almacena datos fuera del navegador. No requiere API ni clave.
- Director creativo: reglas deterministas, no IA generativa ni certificación de compatibilidad. Filtra por sector, función, nivel máximo y objetivo; limita M3 a una secuencia. Contacto urgente y salud sin efecto obligatorio. Las combinaciones requieren auditoría del cliente.
- Websites completos: referencias aprobadas y separadas de componentes importables. No copiar código o medios sin derechos.
- No activar una API hasta disponer de catálogo y reglas validados.
- Generación de 65 WebP y 65 WebM y QA automatizada de V2 y regresión cerradas: runs 43627677478 y 43627681718. Pendiente revisión visual editorial de las grabaciones y Pages.

- Sector: recomendaciones curadas y compatibilidad amplia, ordenadas sin excluir otros usos. Archivo pendiente se muestra por separado, sin ID ficticio.
- Las grabaciones se activan explícitamente, no en reproducción masiva; respeta preferencias de movimiento y carga diferida.

## Identidad oficial — fase activa
- SVG exacto recibido del usuario (hash Git 13470f929e099fda97ebc1676ce8aef8f11872ee); favicon PNG de 32×32 extraído directamente del ICO oficial, sin redibujar (hash 8e4fee3dfeb7251479bb03663339bd76754bd24f).
- Wordmark en los encabezados del catálogo, catálogo técnico y preview; favicon en esas tres rutas y redirecciones de la biblioteca. No usar el logo maestro de presentación como cabecera.
- Estilo limitado a la interfaz; sin cambios en componentes ni previews grabados. Prueba de hashes, carga y responsive; no regenerar medios ya capturados.
- Identidad oficial cerrada a nivel interno: [QA de marca PASS](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/43630217270), 4 anchos y capturas inspeccionadas; registro y 364 blobs protegidos intactos. La V2 completa sigue en validación. Cloudflare y ATREZZO AI no se activan en esta fase.

## Siguiente fase: revisión editorial del catálogo
- Reducir distancia hasta las primeras previews: el hero y los filtros consumen la primera pantalla en los cuatro tamaños inspeccionados. La misión es localizar componentes visualmente, no leer una portada extensa.
- Revisar las 65 capturas y grabaciones; corregir solo las que no representan bien su movimiento. No reabrir identidad ni módulos aprobados.
- Validar recomendaciones y navegación antes de publicar V2; Safari y Pages pendientes.

## Fase 04 — visual-first workspace (16/11/2026)
- Revisión editorial de 65 posters y cinco fotogramas por cada uno de 65 WebM (325 fotogramas). Defectos de encuadre o momento representativo: ATZ-CTR-003, ATZ-NAV-003, ATZ-PGT-001/002/003, ATZ-TRN-001. Reparación de capturas únicamente; preservar los otros 59 pares. Las demostraciones usan medios de muestra autorizados o abstractos, no fotografías de clientes.
- Biblioteca primero: cabecera compacta, búsqueda, categorías horizontales, sector y sección visibles, filtros avanzados plegables, favoritos rápidos. Selección inicial transversal de 12 movimientos sin eliminar los demás. Director con miniaturas auténticas y restricciones de uso; invalida propuestas obsoletas. Tests de 40 combinaciones de sector y dosis, 4 anchos y umbral de acceso visual.
- Pendiente de resultados de CI y revisión de seis medios reparados. No publicar antes del cierre. No se modifica el registro maestro, identidad ni componentes.
