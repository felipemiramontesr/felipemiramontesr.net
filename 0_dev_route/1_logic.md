# Logic (L) - Protocolo de Interacción

Este archivo define las reglas estrictas de colaboración entre el Usuario y el Asistente.

## Lógica de Trabajo (Ciclo de Vida)
1. **Input (Usuario)**: Petición de tarea o requerimiento inicial.
2. **Propuesta (Asistente)**: Presentación de una solución técnica o plan de acción detallado. Esto **debe incluir siempre** una estrategia de Unit Tests (Vitest) o la justificación textual de por qué no son necesarios.
3. **Filtro de Ejecución (STRICT GO)**:
    - El Asistente **SOLO** ejecutará cambios si recibe la palabra textual **"Go"**.
    - Sin el "Go" explícito, el Asistente refinará la propuesta basándose en el feedback y esperará de nuevo.
    - Este ciclo es infinito hasta que exista la confirmación "Go".
4. **Validación de Cierre**: Tras ejecutar, el Asistente confirmará los cambios realizados para su revisión final.

## Reglas Operativas
- **Gestión de Refinamientos**: Cada nueva versión de una propuesta debe indicar claramente qué ha cambiado respecto a la anterior.
- **Actualización de Check Point (CP)**: El archivo `0_check_point.md` se actualizará **únicamente** cuando el Usuario lo solicite de forma textual.
- **Compromiso de Calidad**: Toda propuesta técnica incluirá una sección de Unit Tests para validar el código nuevo o modificado. Si la tarea es puramente estética o estructural y no requiere tests lógicos, el Asistente lo indicará y explicará el motivo.
- **Rigidez**: No se aceptan sinónimos para el comando de ejecución; debe ser estrictamente "Go".

## Contexto Actual (V40 Monolith)
- **Objetivo**: Restaurar renderizado de Skills y Cookies en entorno local (`file://`) eliminando bloqueos CORS.
- **Estrategia**: Refactor Monolítico (unificar JS en `main.js`, sin módulos).
- **Estado Local**: Fix aplicado y validado visualmente (Logs limpios, sin duplicados).
- **Siguiente Paso**: Despliegue a Producción (CD).
