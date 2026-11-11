# ATREZZO TRANSITIONS 01 — Ingesta y validación

**Fecha:** 11 de noviembre de 2026.  
**Material aprobado:** `ATREZZO_TRANSITIONS_01_COMPLETO(1).zip`.  
**SHA-256 del ZIP:** `986573ee0d0b49c8d1901fe8aebb656a897f99a0d2c14b4a7eee5282ef432bbe`.

## Decisión de auditoría

El ZIP reenviado es **idéntico byte por byte** a `ATREZZO_TRANSITIONS_01_COMPLETO.zip`, recibido previamente. Sin embargo, las transiciones **no estaban registradas** como componentes en GitHub, por lo que se incorporaron por primera vez. Se añadieron exactamente **3 IDs**, sin duplicar el ZIP ni el componente `ATZ-TRN-001`, que es un efecto diferente controlado por *scroll*.

**Biblioteca después de incorporar:** **48 componentes**, organizados en **8 grupos de descubrimiento**, con categoría independiente `Transiciones entre páginas`.

| ID | Nombre | Interacción | Movimiento |
|---|---|---|---|
| `ATZ-PGT-001` | Veil | Navegación/clic | Cortina vertical de abajo hacia arriba |
| `ATZ-PGT-002` | Split | Navegación/clic | Dos paneles horizontales de izquierda y derecha |
| `ATZ-PGT-003` | Iris | Navegación/clic | Máscara circular central |

Estos tres movimientos se controlan con **Web Animations API**, no con desplazamiento de pantalla. No utilizan GSAP, Lenis, paquetes npm ni código de Codrops Interlude.

## Fidelidad a las fuentes originales

Se copiaron **sin modificar un byte** el motor, la hoja CSS, el script preflight y las tres ilustraciones SVG originales del paquete. La verificación independiente se automatizó en `tests/page-transitions-contract.mjs` con huellas SHA-1 Git blob:

| Archivo original | Ruta en biblioteca | Git SHA-1 |
|---|---|---|
| `src/atrezzo-transitions.js` | `components/page-transitions/runtime.js` | `d657b223bbf5ea1d41d7b8b56ed89989845ce7ac` |
| `src/atrezzo-transitions.css` | `components/page-transitions/atrezzo-transitions.css` | `a9a65fa1db4e8fff39bc2bdd05e5d27e0ffe8695` |
| `src/atrezzo-preflight.js` | `components/page-transitions/preflight.js` | `ecfc1f5b0d02a91bd7cd6403799ef139b2539236` |

Las SVG originales permanecen en `components/page-transitions/assets/` y se verifican mediante el mismo contrato de integridad.

Cada efecto utiliza **480 ms de cobertura**, **560 ms de revelado**, y `cubic-bezier(0.76, 0, 0.24, 1)`. El adaptador de cada ID utiliza el motor original `AtrezzoTransitions` y su API `swap()` para la preview, sin reproducir la animación con otro algoritmo.

## Archivos e integración

Cada ID exporta de forma aislada **cinco archivos funcionales**: HTML de referencia, adaptador JS de ese efecto, CSS original, motor compartido original y script preflight para navegación entre documentos. No arrastra las otras variantes.

El CSS `showcase.css` es exclusivamente de catálogo; **no se instala en webs de clientes**. Las tres ilustraciones SVG solo ilustran el movimiento; no se identifican como fotografías ni proyectos comerciales.

Para webs HTML convencionales debe instalarse preflight en `<head>`, cargar motor y CSS en todas las páginas y marcar únicamente los enlaces internos que deben animarse mediante `data-atz-link` y `data-atz-effect`. Los sitios que usan un router cliente requieren adaptación específica.

## Pruebas terminadas

- Integridad del ZIP original y su manifiesto SHA-256: **PASS**, mediante `tests/COMPROBAR_PAQUETE.py` del propio paquete.
- [Pruebas de Node y contratos](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/43011361802): **PASS**.
- [Chromium: 192 comprobaciones de pantalla/variante](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/43011362031): **PASS**, 48 componentes a 375, 768, 1024 y 1440 px.
- Se probó la transición de los tres efectos entre escenas mediante el propio motor, overlay desmontado, sin errores JS y sin overflow horizontal.
- Se comprobó navegación HTML **real** con la secuencia Atelier → Material → Night → Atelier, además de **Atrás**, eliminación de estado temporal, cambio de página sin JS y `prefers-reduced-motion:reduce`.
- Las tres SVG se cargan antes del cambio; las capturas finales se inspeccionaron visualmente, sin imágenes vacías.
- [Despliegue GitHub Pages](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/43011360500): **PASS** para la corrección visual validada.

### Pruebas y vistas

- [Preview Veil](https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/preview.html?id=ATZ-PGT-001)
- [Preview Split](https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/preview.html?id=ATZ-PGT-002)
- [Preview Iris](https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/preview.html?id=ATZ-PGT-003)
- [Demostración de navegación real entre documentos](https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/page-transitions-demo/atelier.html)

## Estado después de la ingesta

**Ingesta y validación interna cerradas.** Las tres previews se etiquetan como `Demo probada`. **`client_ready:false`** y **`status:validation`** siguen siendo correctos porque faltan prueba Safari/iOS y Firefox, integración con el repositorio y navegación reales de un cliente, reglas CSP, SEO y rendimiento con contenido final.

El motor no se ha instalado en ningún website de cliente, no se han modificado componentes anteriores y el catálogo conserva `noindex`.
