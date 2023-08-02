// Esta clase simplemente hereda de la clase Error de Javascript
// y nos permite manejar nuestro propios errores personalizados

export default class CustomError extends Error {
    constructor(err, detail = '') {
        // if (detail != '') console.log(detail);
        super(err.msg);
        this.statusCode = err.code;
        this.customError = true;
        Error.captureStackTrace(this, this.constructor);
    }
}