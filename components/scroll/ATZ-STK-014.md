# ATZ-STK-014 — Compresión vertical con expansión interna

**Origen aprobado:** `ATREZZO_03_StickySections_15_MAC_LISTO(1).zip` — `StickySections-main/js/demo14/index.js`.  
**Fuente:** Codrops / *Animations for Sticky Sections* — código MIT (`sources/codrops-sticky-sections/LICENSE`).  
**Estado:** `validation`; **no** está habilitado para un sitio de cliente sin pruebas en su contexto.  
**Categoría:** Scroll & Motion / Sticky Sections.  
**Activa por:** scroll vertical, no clic ni reproducción automática.  
**Paneles:** seis, posicionados `sticky` y animados con GSAP + ScrollTrigger.

## Efecto exacto del ZIP

El panel se contrae verticalmente mientras sus elementos aumentan de escala y se desvanecen.

Los valores originales de `start`, `end`, `scrub`, `scale`, `rotation`, `filter` y ejes de transformación se mantienen en el módulo de este ID. `lenis` era parte del suavizado global de la demo y no se inyecta automáticamente en otros websites.

## Guía de selección y uso

**Recomendado para:** Cierre de capítulos y transiciones teatrales.  
**Evitar en:** Webs informativas de lectura continua.

Archivos necesarios (no copiar las otras 14 variantes):
- HTML: `components/scroll/ATZ-STK-014.html`
- CSS de familia: `components/runtime/atrezzo-sticky.css`
- JS **solo del ID**: `components/scroll/ATZ-STK-014.js`
- Ciclo de vida: `components/runtime/sticky-lifecycle.js`

```js
import {mount} from "/components/scroll/ATZ-STK-014.js";
const instance=mount(document.querySelector("#sticky-section"),{
  gsap:window.gsap,ScrollTrigger:window.ScrollTrigger
});
// Eliminar triggers al salir de una página SPA:
instance.destroy();
```

## Fidelidad visual y licencias

El fragmento mantiene la estructura de seis paneles y el texto ilustrativo de la fuente. Las imágenes PNG de Annas Muslimin/Vecteezy del ZIP no se publican porque su licencia comercial no se ha verificado. Se sustituyen por composiciones SVG abstractas originales **sin modificar los parámetros de la animación**. Para un cliente deben añadirse fotografías autorizadas y contenido real; no se atribuye el material de muestra a ningún negocio.

## Validación requerida

Prueba 375/768/1024/1440, scroll directo e inverso, navegación por teclado, `prefers-reduced-motion`, sin JS, clips y desbordamiento, desmontaje SPA y rendimiento con medios reales. No publicar mientras `client_ready:false`.
