# ATREZZO Sticky Sections 15 — Informe de auditoría e integración

**Fecha:** 10 de noviembre de 2026
**Archivo aprobado:** `ATREZZO_03_StickySections_15_MAC_LISTO(1).zip`
**Fuente de código:** Codrops — *Animations for Sticky Sections*, licencia MIT.
**Resultado:** quince patrones **realmente activados por scroll**, registrados individualmente; estado **validado internamente** (no certificado para clientes).

## Inventario de efectos aprobados

| ID permanente | Movimiento de salida / transición | Demostración |
|---|---|---|
| ATZ-STK-001 | Oscurecimiento y giro fotográfico | [Preview](https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/preview.html?id=ATZ-STK-001) |
| ATZ-STK-002 | Reducción con esquinas redondeadas | [Preview](https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/preview.html?id=ATZ-STK-002) |
| ATZ-STK-003 | Contracción central en capas | [Preview](https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/preview.html?id=ATZ-STK-003) |
| ATZ-STK-004 | Contracción desde esquinas alternas | [Preview](https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/preview.html?id=ATZ-STK-004) |
| ATZ-STK-005 | Giro diagonal de paneles | [Preview](https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/preview.html?id=ATZ-STK-005) |
| ATZ-STK-006 | Plegado tridimensional hacia atrás | [Preview](https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/preview.html?id=ATZ-STK-006) |
| ATZ-STK-007 | Tarjetas que se alejan y desvanecen | [Preview](https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/preview.html?id=ATZ-STK-007) |
| ATZ-STK-008 | Desenfoque progresivo en tarjetas | [Preview](https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/preview.html?id=ATZ-STK-008) |
| ATZ-STK-009 | Paneles laterales y contraste fotográfico | [Preview](https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/preview.html?id=ATZ-STK-009) |
| ATZ-STK-010 | Salida vertical de paneles divididos | [Preview](https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/preview.html?id=ATZ-STK-010) |
| ATZ-STK-011 | Despedida diagonal con rotación | [Preview](https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/preview.html?id=ATZ-STK-011) |
| ATZ-STK-012 | Paneles alternos con alto contraste | [Preview](https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/preview.html?id=ATZ-STK-012) |
| ATZ-STK-013 | Desplazamiento horizontal y descomposición | [Preview](https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/preview.html?id=ATZ-STK-013) |
| ATZ-STK-014 | Compresión vertical con expansión interna | [Preview](https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/preview.html?id=ATZ-STK-014) |
| ATZ-STK-015 | Paralaje fotográfico con rotación | [Preview](https://atrezzostudiosv-spec.github.io/atrezzo-repositorio/catalog/preview.html?id=ATZ-STK-015) |

Los 15 patrones usan seis secciones `position:sticky` cada uno. La animación se obtiene directamente de `StickySections-main/js/demo1..demo15/index.js` del ZIP. No se ha sustituido por movimiento de clic.

## Adaptaciones técnicas efectuadas

1. Se conservaron `start`, `end`, `scrub`, `easing` y los valores de transformación de GSAP de cada demo; cada uno tiene su propio JS en `components/scroll/ATZ-STK-XXX.js`.
2. Se separó el ciclo de vida GSAP en `components/runtime/sticky-lifecycle.js` para montar y desmontar cada efecto sin afectar otros efectos ni la navegación de un website.
3. CSS original de composición adaptado a un namespace `.atz-sticky`, sin cambiar estilos globales del cliente. Archivo `components/runtime/atrezzo-sticky.css`.
4. 15 escenas HTML independientes y 15 fichas de integración. El registro JSON pasa de 14 a **29 componentes**.
5. Imágenes originales: la documentación del ZIP atribuye las PNG a Annas Muslimin (Vecteezy), pero no contiene licencia comercial acreditada para reutilizarlas. En el catálogo se reemplazaron por ilustraciones abstractas SVG de estudio y se mantuvo el movimiento de cada imagen.
6. El ZIP usa Lenis para suavizar el scroll global. La biblioteca **no lo instala automáticamente** para no interferir con otros sites; scroll nativo + GSAP ScrollTrigger conserva la lógica, aunque la sensación de suavizado del ZIP puede diferir.
7. Se corrigió la herencia de color de las previews claras (fondos grises con texto negro), después de revisar capturas automáticas.

## Evidencia de calidad

- [Pruebas Node/selección y exportación por ID: PASS](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42812196661).
- [Pruebas Chromium: PASS, 116 combinaciones](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42812196669) (29 IDs × 375 / 768 / 1024 / 1440 px). Los 15 sticky nuevos se prueban específicamente contra ScrollTrigger, scroll en progreso, número de paneles, ausencia de overflow y destrucción de timelines; también reducción de movimiento y contenido sin JavaScript.
- [Despliegue GitHub Pages: PASS](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42812195207).
- El artifact `atrezzo-browser-qa` contiene capturas de cada variante en 1440 px y un informe JSON. Se revisó una vista conjunta y capturas representativas del conjunto (incluyendo claras y 3D). Es evidencia visual de composición, no sustituto de QA editorial completo con contenido real.

## Reglas de uso en cliente

Identificar el ID preciso en `registry/components.json`, abrir su ficha y usar los cuatro archivos declarados en el registro; nunca copiar las quince demos completas. Integrar fotografías y textos reales del negocio; verificar SEO, responsive, teclado, scroll natural e inverso, rendimiento y Safari/iOS antes de publicar.

**Pendiente:** fotografías autorizadas/optimizadas, revisión con contenido final, Safari y WebKit, primera integración real cliente. Los quince siguen `status:validation`, `client_ready:false`.

## Continuidad

Este ZIP aprobado queda registrado como un nuevo paquete de Fase 5, sin modificar el diseño visual del catálogo aprobado ni los 14 componentes anteriores. La ingesta de los restantes ZIP del proyecto continúa siendo tarea pendiente por lotes.
