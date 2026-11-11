# ATZ-PGT-002 — ATREZZO Page Transitions 01 / Split

**Estado:** en validación para integración comercial. **Categoría:** Transiciones entre páginas. **Activación:** navegación HTML (clic o teclado), **no scroll**.

## Fuente aprobada y efecto exacto

Archivo autorizado `ATREZZO_TRANSITIONS_01_COMPLETO(1).zip`, idéntico byte por byte al `ATREZZO_TRANSITIONS_01_COMPLETO.zip` anterior. Motor original preservado en `components/page-transitions/runtime.js`, CSS original en `components/page-transitions/atrezzo-transitions.css`, preflight original en `components/page-transitions/preflight.js`.

**SPLIT**: Dos planos laterales que se encuentran en el centro y después se retiran hacia sus bordes.

- `coverMs:480`, `revealMs:560`, easing `cubic-bezier(0.76, 0, 0.24, 1)`.
- Movimiento original controlado por Web Animations API, sin GSAP/Lenis y sin manipular scroll.
- El adaptador `ATZ-PGT-002.js` demuestra la variante con el método original `swap()`; no redefine keyframes.
- Web real: usar navegación tradicional con `navigate()`, enlaces `a[data-atz-link]`, preflight en `<head>` en TODAS las páginas y motor original cargado al final de `<body>`.
- No colocar `showcase.css` ni los tres ejemplos de demo en el website de clientes.

## Archivos de uso

- HTML de demostración individual: `components/page-transitions/ATZ-PGT-002.html`
- Adaptador individual: `components/page-transitions/ATZ-PGT-002.js`
- CSS original de motor: `components/page-transitions/atrezzo-transitions.css`
- JS original de motor: `components/page-transitions/runtime.js`
- Preflight de navegación documental: `components/page-transitions/preflight.js`.

### Integración real: documento HTML tradicional

Insertar **en TODAS** las páginas dentro de `<head>`:

```html
<link rel="stylesheet" href="/assets/atrezzo-transitions.css">
<script src="/assets/atrezzo-preflight.js"></script>
```

Cargar al final de `<body>`:

```html
<script src="/assets/atrezzo-transitions.js"></script>
<script>
  new AtrezzoTransitions({
    defaultEffect:"split",coverColor:"#172d32",
    coverMs:480,revealMs:560,showLabel:false
  });
</script>
```

Marcar únicamente los enlaces donde se quiere animación:

```html
<a href="/services.html" data-atz-link data-atz-effect="split">Servicios</a>
```

Cambiar rutas absolutas por **relativas** si se publica en una subcarpeta GitHub Pages. Nunca marcar enlaces externos, anclas, `mailto:`, `tel:`, WhatsApp, descargas ni la navegación del navegador. Si el sitio usa React Router, Astro ClientRouter o View Transitions, adaptar el motor en vez de interceptar de forma documental.

**Demo multipágina:** `catalog/page-transitions-demo/atelier.html`, `material.html`, `night.html` (las tres rutas prueban el mismo motor). El botón en la preview lo abre en otra pestaña.

## Validación y limitaciones

Comprobar 375/768/1024/1440 px, `prefers-reduced-motion`, clic modificado, Escape/foco de navegación normal, visita directa, recarga y retroceso/avance. La demo y la navegación de ejemplo no certifican un website cliente. No afecta contenidos comerciales ni copia assets externos. Código original de ATREZZO STUDIOS, no Codrops Interlude.
