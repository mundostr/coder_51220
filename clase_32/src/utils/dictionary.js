/**
 * Un diccionario no es imprescindible, pero sí muy ordenado para unificar los códigos
 * y mensajes de error a utilizar en nuestro sistema de manejo personalizado.
 */

const errorsDict = {
    ROUTING_ERROR: { code: 404, msg: 'No se encuentra el endpoint solicitado' },
    INVALID_TYPE_ERROR: { code: 400, msg: 'No corresponde el tipo de dato' },
    DATABASE_ERROR: { code: 500, msg: 'No se puede conectar a la base de datos' },
    INTERNAL_ERROR: { code: 500, msg: 'Error interno de ejecución del servidor' }
}

export default errorsDict