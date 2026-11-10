# FASE 4 — Informe de integración por ID / ATREZZO

**Fecha:** 2026-11-10  
**Cierre:** interna y automatizadamente validado, sin intervención en websites de clientes.

## Objetivo

Que una instrucción de ChatGPT pueda localizar y preparar exactamente el componente indicado por su ID, sin seleccionar por parecido, importar una demo entera ni cambiar la identidad de un website existente.

## Evidencia

| Control | Resultado | Evidencia |
|---|---|---|
| Resolver 11 IDs exactos + rechazar IDs inexistentes o mal formados | APROBADO | [Workflow Node](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42801875846) |
| Dependencias: un módulo del ID + un controlador compartido | APROBADO | [Workflow Node](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42801875846) |
| Exportar exclusivamente 4 archivos funcionales + licencia | APROBADO | [Workflow Node](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42801875846) |
| Rechazar sobrescritura del directorio de exportación | APROBADO | [Workflow Node](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42801875846) |
| Integrar `ATZ-SCR-008` en una página independiente con CSS anfitrión sin alteración | APROBADO | [Workflow Chromium](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42801875815) |
| Responsive 375/768/1024/1440, scroll, desmontaje y sin JS en laboratorio | APROBADO | [Workflow Chromium](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42801875815) |
| Publicación GitHub Pages de archivos de Fase 4 | BUILD APROBADO | [Workflow Pages](https://github.com/atrezzostudiosv-spec/atrezzo-repositorio/actions/runs/42801874386) |

## Archivos nuevos

- `docs/AI-INTEGRATION-WORKFLOW.md`: contrato operativo para ChatGPT.
- `scripts/resolve-component.mjs`: consulta estricta de un ID y creación de una instrucción lista para ChatGPT.
- `scripts/export-component.mjs`: copia acotada sin sobrescribir y sin editar archivos de cliente.
- `examples/ai-ATZ-SCR-008/index.html` y `main.js`: laboratorio de integración.
- `tests/ai-integration.mjs` y casos añadidos a `tests/browser-qa.mjs`: validación en CI.

## Uso

Desde un chat del cliente con acceso al repositorio, solicitar:

> Integra ATZ-SCR-008 de ATREZZO en esta sección. Antes de modificar nada, consulta AGENTS.md y el registro de la biblioteca, comprueba el código del cliente y utiliza solo los archivos exactos del ID. Mantén la identidad y el diseño aprobado; realiza pruebas.

Con terminal se puede ejecutar `node scripts/resolve-component.mjs ATZ-SCR-008 --prompt` o preparar exportación mediante `node scripts/export-component.mjs ATZ-SCR-008 --out ./salida`.

## No probado / no autorizado

- Que un nuevo chat de ChatGPT sin contexto ni acceso a GitHub descubra automáticamente la biblioteca.
- Integración y validación dentro de un website de cliente real.
- Rendimiento final, licencias de fotografías comerciales y comportamiento Safari/Firefox.

**Producción:** los 11 IDs continúan `status:validation` y `client_ready:false`. El diseño aprobado de la biblioteca no se ha modificado.

**Próximo trabajo:** FASE 5, clasificación de los 12 paquetes pendientes por componente, variante y categoría.
