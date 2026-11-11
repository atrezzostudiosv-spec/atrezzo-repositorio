# ATREZZO Motion Library V1 — Informe de ingesta

**Fecha de revisión e integración:** 11 de noviembre de 2026.  
**Origen aportado:** `ATREZZO_MOTION_COMPONENTES_PARA_WEB_V1.zip` y `ATREZZO_MOTION_LIBRARY_V1_COMPLETA.zip`.
**Código fuente:** motor propio `dist/atrezzo-motion.js` y CSS `dist/atrezzo-motion.css`, idénticos en ambos paquetes.
**Resultado:** **siete movimientos de autoría Atrezzo incorporados y probados internamente**; biblioteca de 38 a **45 IDs**.

## Patrones incorporados y catalogados

| ID | Nombre | Ubicación en biblioteca | Activación |
|---|---|---|---|
| ATZ-MOT-001 | Text Reveal | Tipografía en movimiento | Entrada en pantalla |
| ATZ-MOT-002 | Text Scrub | Tipografía en movimiento | Scroll |
| ATZ-MOT-003 | Image Parallax | Galerías y mosaicos | Scroll |
| ATZ-MOT-004 | Home Hero Collage | Heroes cinematográficos | Scroll |
| ATZ-MOT-005 | Cinematic Hero Reveal | Heroes cinematográficos | Scroll |
| ATZ-MOT-006 | Editorial Journey | Narrativa por scroll | Scroll |
| ATZ-MOT-007 | Burned Image | Galerías y mosaicos | Scroll |

Los siete patrones tienen contrato exacto de cuatro archivos por ID, preview individual y ficha técnica. Comparten solo `components/motion/runtime.js` (gestión limpia de eventos, resize, matchMedia y requestAnimationFrame). El CSS está encapsulado bajo `.atz-motion-v1` y reutiliza los parámetros de movimiento del material autorizado.

## Decisiones de seguridad y producto

- No se copia el sistema monolítico `initAtrezzoMotion(document)` al cliente.
- No se incorporan los elementos de navegación global, `PageWipe`, modales ni bloqueo de scroll: el ZIP original presentó un defecto comprobado de coordinación de overlays entre instancias.
- No se publica ninguna fotografía, vídeo, logo o copy comercial perteneciente al proyecto Spain Collection. Los ejemplos muestran composiciones abstractas CSS propias.
- La variante `ATZ-MOT-001` es una animación de **entrada en viewport**, no scrub sincronizado con scroll; `ATZ-MOT-002` sí responde al desplazamiento directo. Se reflejan las categorías de interacción para evitar confusiones.
- La obra original fue presentada como código Atrezzo basado en movimientos documentados y fuentes públicas; no se ha certificado independencia jurídica de terceros.
- Todas las demos permanecen `noindex`.

## Validación automatizada

- [Pruebas de código, integridad, IDs y exportación](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/43002536698): **APROBADAS**.
- [Pruebas Chromium de catálogo, escenas, scroll y responsive](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/43002536726): **APROBADAS**; 180 comprobaciones individuales (45 variantes × 4 resoluciones).
- [GitHub Pages deployment](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/43002536432): **APROBADO**.

Comprobaciones nuevas incluyen estructura correcta del DOM, respuesta del scrub tipográfico, propiedades de parallax, seis piezas del hero collage, clip fotográfico, tres pasos del recorrido editorial, contraste Burned Image y desmontaje. Se probó movimiento reducido en el hero.

## Pendiente fuera de la biblioteca

Probar cada integración real a 375/768/1024/1440 px, revisar Safari/iPhone y Firefox, usar fotografía y texto reales con permisos, comprobar accesibilidad con contenido final y rendimiento en dispositivos físicos. **Todos siguen `status:validation` y `client_ready:false`**, aunque en catálogo se muestre «Demo probada».

## Componentes deliberadamente excluidos

Stacked Cards, CTAReveal, FooterProgress, DestinationCards, AmbassadorCards, ScrollVideo, MobileNavigation, Video/InfoModal y PageWipe permanecen como patrones para auditoría futura. No se registraron por duplicidad probable, naturaleza de utilidad o riesgos técnicos no resueltos; registrar requeriría evaluación separada y corrección antes de usar como componente de cliente.

[Auditoría de origen](ATREZZO-MOTION-LIBRARY-V1-AUDIT.md).
