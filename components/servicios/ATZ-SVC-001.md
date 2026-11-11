# ATZ-SVC-001 — Service Bento 1+4

**Fuente exacta:** [Home de Tri-Lane Roofing](https://github.com/atrezzostudiosv-spec/tri-lane-roofing/blob/main/index.html), sección `.tl-wwd-section` «WHAT WE DO». La captura del usuario del 11/11/2026 corresponde a este bloque.

**Familia:** Composiciones de servicios. **Tipo:** Bento asimétrico; una tarjeta protagonista y cuatro secundarias en cuadrícula 2×2. **Interacciones:** revelado selectivo al entrar en viewport, hover discreto en desktop, carrusel táctil horizontal en móvil con `scroll-snap`, teclado ArrowLeft/ArrowRight al enfocar el carrusel.

## Estado de origen — no confundir con aceptación comercial

- Tri-Lane es una **demo/propuesta comercial de Atrezzo**, no el website oficial contratado. El expediente fuente mantiene `noindex`.
- El repositorio de origen documenta QA responsive y accesibilidad en varios anchos (ver `docs/final-qa-closeout-2026-10-22.md`), pero no equivale a prueba de esta versión extraída y aislada.
- No copiar fotografías, logo, datos, testimonial ni el CSS de otras páginas de Tri-Lane. Las cinco imágenes en esta demo son **SVG arquitectónicos de ejemplo**, nuevos, no proyectos reales.
- Las etiquetas «Residential Roofing», etc., solo permiten reconocer la composición de la captura. No son afirmaciones sobre otro cliente. Reemplazar por servicios verificados y copy real al integrar.

## Fidelidad de diseño

Se mantienen estos valores de composición del código aprobado visualmente en el Home:
- Fondo `#171B1E`, acento `#F58620`, tarjetas con radio `12px`, borde `#55616A`.
- Contenedor máximo `1280px` con padding `24px`, grid `1.24fr 1fr`, gap `14px`; derecha `2×2`.
- Feature con ancho y jerarquía tipográfica predominantes, lista de servicios y CTA destacado.
- Tablet `≤1023px`: una columna principal más dos columnas secundarias.
- Móvil `≤767px`: **carrusel horizontal** con tarjetas `min(82vw,350px)` y `scroll-snap-type:x mandatory`, manteniendo contenido accesible sin JS.
- Entrada `translateY(18px)`/opacity, `700ms` y easing `cubic-bezier(.33,0,.2,1)`; escalonado de tarjetas secundarias `160ms` desktop.
- `prefers-reduced-motion` evita revelados; fallback sin JavaScript conserva estructura y texto visible.

## Archivos y montaje

- `components/servicios/ATZ-SVC-001.html` — composición de muestra, cinco tarjetas y destinos de ejemplo.
- `components/servicios/ATZ-SVC-001.css` — estilos propios encapsulados bajo `.atz-svc`.
- `components/servicios/ATZ-SVC-001.js` — adapter `mount(host)`.
- `components/servicios/runtime.js` — IntersectionObserver, teclado móvil y `destroy()`.
- `components/servicios/illustration-01.svg` … `illustration-05.svg` — placeholders visuales de la biblioteca; sustituir por fotografías autorizadas en la implementación.

```js
import {mount} from "./components/servicios/ATZ-SVC-001.js";
const instance=mount(document.querySelector("#services-container"));
// Más tarde: instance.destroy();
```

**Límite de uso:** la sección es una gramática de presentación, no una plantilla de roofing. Adaptar a marca y negocio desde la auditoría, sin importar servicios ni fotografías del origen por defecto. Evitar tarjetas vacías: si solo hay tres servicios, adaptar la composición en lugar de inventar dos.

## Pruebas necesarias

Verificar 375 / 768 / 1024 / 1440 px y tamaños intermedios, navegación keyboard, swipe real, botones, enlaces de destino, sin JS, `prefers-reduced-motion`, scroll inverso, observadores, multiinstancia y desmontaje. `client_ready:false` hasta pruebas en cliente con medios definitivos.

**Tipografía visual:** la preview puede cargar opcionalmente Barlow Condensed y Manrope (fuentes web usadas en la demo original) para mantener fidelidad fotográfica/editorial. Los cuatro archivos funcionales exportados **no dependen** de esa URL y usan fuentes de respaldo. En un proyecto cliente se ajusta `--atz-svc-title` a la tipografía aprobada de esa marca, sin importar fuentes ajenas por defecto.
