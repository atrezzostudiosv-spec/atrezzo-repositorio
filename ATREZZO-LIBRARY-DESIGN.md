# ATREZZO COMPONENT LIBRARY — Dirección visual 1.0
**Fecha:** 2026-11-10
**Estado:** DIRECCIÓN VISUAL APROBADA POR EL USUARIO (2026-11-10). La implementación técnica permanece en validación.

**Control de continuidad:** conservar paleta cromática, tipografías, jerarquía, navegación, hero y estilo de las tarjetas aprobadas. Las correcciones técnicas, de accesibilidad o responsive no autorizan un rediseño general; justificar cualquier cambio visual necesario.

## Referencias de dirección estética aportadas por el usuario
- `korvio_saas_website.html`: escala cromática oscura azul-negro, acentos violeta y cian, paneles sobrios, organización de dashboard, tipografía Inter y Plus Jakarta Sans.
- `pixelcraft_web_agenc_a_de_dise_o_y_desarrollo_web.html`: degradados índigo-cian, brillos muy controlados, tratamientos glass, presentación de portafolio con tarjetas y previews.

**Referencias de estilo, no contenido.** No copiar sus marcas, claims, precios, estadísticas o testimonios ficticios al ecosistema Atrezzo.

## Tokens activos
| Propósito | Variable | Valor |
|---|---|---|
| Fondo principal | `--bg` | `#0B0F17` |
| Panel base | `--panel` | `#151B2B` |
| Panel elevado | `--panel2` | `#1E2638` |
| Acento principal | `--violet` | `#7C3AED` |
| Acento secundario | `--cyan` | `#06B6D4` |
| Texto principal | `--white` | `#F8FAFC` |
| Texto secundario | `--muted` | `#94A3B8` |

**Tipografía:** `Plus Jakarta Sans` para títulos, `Inter` para interfaz y documentación. CSS fallback a system sans-serif. Iconos simples, sin emojis decorativos.

## Composición
1. Header compacto, con palabra ATREZZO y descriptor COMPONENTS. No utilizar marcas o logotipos de las referencias.
2. Sidebar de categorías en desktop (no empujar contenido lateral en móvil).
3. Hero editorial breve: propuesta de valor de la biblioteca, arte abstracto geométrico y CTA al catálogo.
4. Indicadores solo de datos **reales del registro**: variantes, categorías, validadas.
5. Componentes como productos de una librería: preview visual 16:10 dominante, ID, categoría, nombre, estado técnico, enlace a demo, acción de copiar ID.
6. Vista individual para cada ID con efecto scroll original adaptado a demostración, fuente reconocible y estado de seguridad/validación.
7. Acabado: máximo un acento fuerte por región, sombras y glows moderados. Evitar saturación, glass indiscriminado, gradientes estridentes o dashboards de venta genéricos.

## Sistema de uso
`reference` no equivale a `ready`. La tarjeta nunca debe insinuar que el patrón fue validado. Si la vista usa recursos externos o depende de GSAP, declarar la limitación.

## Verificación pendiente
La presencia de archivos en GitHub no constituye prueba de navegador. Validar búsqueda, filtros, copia, navegación, cargas de scripts, previews de cada ID, licencia de medios, acceso sin JS, ancho 375 / 768 / 1024 / 1440, reduced-motion y scroll inverso antes de cerrar Fase 2.
