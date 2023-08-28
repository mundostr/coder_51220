// El diccionario nos permite estandarizar los códigos y mensajes de error
// para tener uniformidad a lo largo del desarrollo, muy útil al trabajar en equipo

const errorsDict = {
    ALL_OK: { code: 200, msg: 'Solicitud ok' },
    NO_ROUTING: { code: 404, msg: 'No se encuentra el endpoint solicitado' },
    INVALID_TYPE: { code: 400, msg: 'No corresponde el tipo de dato' },
    INCOMPLETE_DATA: { code: 400, msg: 'Datos incompletos' },
    DATABASE_ERROR: { code: 500, msg: 'No se puede conectar a la base de datos' },
    INTERNAL: { code: 500, msg: 'Error interno de ejecución del servidor' },
    NO_CONTENT: { code: 500, msg: 'No se pudo recuperar el contenido' },
    ALREADY_REGISTERED: { code: 400, msg: 'El valor indicado ya se encuentra registrado' },
    UNAUTHORIZED: { code: 401, msg: 'No autenticado' },
    FORBIDDEN: { code: 403, msg: 'No autorizado' },
    UNPROCESSABLE: { code: 422, msg: 'No se puede procesar la acción por datos no válidos' }
}

export default errorsDict