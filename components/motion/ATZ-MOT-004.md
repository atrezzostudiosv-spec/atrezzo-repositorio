# ATZ-MOT-004 — Home Hero Collage

**Origen:** `ATREZZO_MOTION_LIBRARY_V1_COMPLETA.zip`, motor `dist/atrezzo-motion.js` y estilos `dist/atrezzo-motion.css`, extraídos desde un proyecto previamente autorizado de ATREZZO.
**Estado:** `validation`; `client_ready:false`.
**Grupo de descubrimiento:** heroes. **Interacción:** scroll. **Dependencias:** ninguna; JavaScript nativo.

## Movimiento aprobado

Seis medios fotográficos que cambian de escala y desplazamiento mediante scroll, con titular final progresivo.

**Uso recomendado:** Home de negocios visuales con medios originales de calidad.  
**Evitar:** No usar sin seis fotografías autorizadas o si el hero impide identificar el negocio.

## Archivos individuales

- `components/motion/ATZ-MOT-004.html`
- `components/motion/ATZ-MOT-004.js`
- `components/motion/atrezzo-motion-v1.css`
- `components/motion/runtime.js`

```js
import {mount} from "/components/motion/ATZ-MOT-004.js";
const effect=mount(document.querySelector("#atrezzo-motion-container"));
effect.refresh();
effect.destroy(); // al desmontar el componente o cambiar de página
```

El módulo solo busca su propio identificador y los hooks `[data-am-home-hero]`. No importa navegaciones, modales, bloqueos de scroll, PageWipe ni el motor monolítico. Los estilos se aplican exclusivamente bajo `.atz-motion-v1`.

## Originalidad, fidelidad y límites

Se mantienen la función y las fórmulas del efecto visual de la fuente aprobada. La demostración sustituye medios del proyecto original por formas y gradientes propios de prueba, y el diseño de ejemplo es neutral. La integración comercial requiere fotografías, copy y jerarquía propios del cliente.

**Accesibilidad:** el contenido existe sin JavaScript; el movimiento se reduce cuando el usuario lo solicita; no hay desplazamiento forzado ni interceptación de rueda. Verificar en contextos reales los efectos sobre legibilidad, contraste, foco, vídeo y dispositivos con poca memoria.

**QA pendiente:** 375/768/1024/1440, seguimiento del scroll e inverso, sin JavaScript, reduced-motion, multiinstancia, remoción de listeners y validación en el sitio del cliente. No declarar componente para producción automáticamente.
