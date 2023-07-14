/**
 * La clase CustomError es muy sencilla.
 * Mediante extends indicamos que deseamos heredar todo lo disponible en la clase Error
 * ya propia de Javascript, e inicializamos el resto en función del objeto err recibido
 */

export default class CustomError extends Error {
    constructor(err, detail='') {
        // esto es opcional, solo para logueo en consola, se puede quitar, que el constructor solo reciba err
        if (detail != '') console.log(detail);
        super(err.msg);
        this.statusCode = err.code;
        this.customError = true;
        Error.captureStackTrace(this, this.constructor);
    }
}