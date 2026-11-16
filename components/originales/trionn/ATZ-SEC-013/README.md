# ATZ-SEC-013 — Scroll Frame Sequence

Originales / TRIONN / 04. Usuario aprobó la preview privada ligera. Núcleo original del módulo 28236, blob 43378a2e58a1365289ea95b3ac6b7caf257434c6, seis bloques exactos en exact-segments.json. El motor conserva precarga de lotes de 20, índice 0–370, interpolación .12, opacidad y pin de 800% escritorio/600% móvil.

## Integración
Exportar con node scripts/export-component.mjs ATZ-SEC-013 --out ./salida. Servir por HTTP. Para la demo se generan 371 SVG propios, distintos y de 1920×1080. Para producción, cambiar frames.json a {"mode":"custom","frames":[...]} con exactamente 371 URLs ordenadas, autorizadas, preferiblemente WebP y del mismo origen. Mantener las dimensiones y relación de aspecto coherentes. No alterar el motor ni recrear la animación. Usar GSAP/ScrollTrigger 3.15.0 oficiales. Una instancia por documento. Validar carga, scroll inverso, móvil, reduced-motion y fallback de recursos; client_ready:false hasta QA de cliente. Los fotogramas originales de TRIONN no se redistribuyen; se conservan en el laboratorio privado.
