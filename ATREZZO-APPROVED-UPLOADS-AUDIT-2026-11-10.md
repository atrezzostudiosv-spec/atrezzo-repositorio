# ATREZZO — Auditoría de siete fuentes aprobadas (2026-11-10)

**Estado:** AUDITORÍA CERRADA. La ingesta de código individual continúa pendiente y no debe confundirse con la auditoría. **29 componentes** existentes confirmados; este lote aporta **33 candidatos nuevos**, sujetos a migración y pruebas; los 15 StickySections ya existen.

## Resultados por ZIP

| Archivo recibido | Variantes verificadas | Relación con catálogo | Estado |
|---|---:|---|---|
| `001- Scroll-Transition-main.zip` | 4 | Nuevas transiciones por máscara SVG controladas por scroll, cada una en `index[2-4].html` con `script[2-4].js` | PENDIENTE DE INTEGRACIÓN |
| `02- ATREZZO INTRO.zip` | 1 sistema | Composición tipográfica: GSAP Flip + ScrambleText + ScrollTrigger; la demo activa ScrollSmoother global | PENDIENTE DE INTEGRACIÓN |
| `Atrezzo_Scroll_Sections_01(1).zip` | 3 | Expand, Split y Sequence; ZIP binariamente idéntico a `Atrezzo_Scroll_Sections_01.zip` | PENDIENTE DE INTEGRACIÓN |
| `Atrezzo_Scroll_Sections_02(1).zip` | 3 | Cinematic Handoff, Horizontal Filmstrip, Depth Chapters; ZIP idéntico al ya recibido | PENDIENTE DE INTEGRACIÓN |
| `Atrezzo_Scroll_Sections_03_COMPLETO(1).zip` | 3 | Full-Bleed Chapters, Editorial Layered Panels, Split Narrative; ZIP idéntico al ya recibido | PENDIENTE DE INTEGRACIÓN |
| `ScrollBasedLayoutAnimations-main(1).zip` | 19 | Dos colecciones, 9 galerías en `index.html` y 10 en `index2.html` | PENDIENTE DE INTEGRACIÓN |
| `StickySections-main(1).zip` | 15 | Duplicados de movimiento de `ATZ-STK-001…015`; solo cambian carga/embalaje de la fuente | NO REIMPORTAR |

### Decisiones de dirección y desarrollo

1. **Fidelidad:** conservar el HTML/CSS/JS y los parámetros del movimiento aprobados; adaptar solo aislamiento, importación y controles necesarios, documentando diferencias.
2. **Criterio de categoría:** una transición de máscara SVG activada por scroll es `Scroll & Motion`, no una transición entre rutas. La intro tipográfica se registra como **un sistema** hasta verificar si puede dividirse sin modificar la composición original.
3. **No duplicar:** las tres reentregas de Scroll Sections tienen el mismo contenido de los ZIP originales y StickySections-main repite 15 variantes ya publicadas.
4. **Licencias:** todos los códigos originales Codrops declaran MIT. Las imágenes de demos Codrops, ilustraciones de fuentes ajenas, Adobe Fonts y plugins GSAP requieren revisión independiente antes de reutilizar en clientes. Las fotos de los tres paquetes Atrezzo se marcan como material ilustrativo, no obra comercial del cliente.
5. **Velocidad de scroll:** no instalar globalmente Lenis ni ScrollSmoother de las demos sin auditar scroll y navegación del cliente.
6. **Estado técnico:** la aprobación visual del usuario no equivale a pruebas del código extraído ni a `client_ready:true`.

### Secuencia de trabajo confirmada

Primero migrar las tres colecciones **ATREZZO SCROLL SECTIONS 01/02/03** como 9 efectos nuevos, conservando su ejecución nativa sin dependencias. Después incorporar las 4 transiciones SVG, el sistema de texto y por último las 19 galerías GSAP Flip, que necesitan verificación más intensa de imágenes y layout. No modificar los 29 componentes actuales.

**Las fuentes ZIP siguen disponibles en esta conversación**, pero no han sido copiadas aún como código ejecutable individual a GitHub. El registro de ingesta permite reanudar sin perder lo ya auditado.
