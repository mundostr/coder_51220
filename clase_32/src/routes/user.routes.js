import { Router } from 'express';
import CustomError from '../services/customError.js';
import errorsDict from '../utils/dictionary.js';

export const userRoutes = ()  => {
    const router = Router();

    router.get('/custom/:id', async (req, res, next) => {
        try {
            // A partir de ahora, en lugar de utilizar la clase Error standard, utilizamos
            // nuestra propia instancia de CustomError, pasándole el objeto de error que
            // corresponda desde el diccionario
            if (isNaN(req.params.id)) { throw new CustomError(errorsDict.INVALID_TYPE_ERROR) }
            res.status(200).send({ status: 'OK', payload: { id: req.params.id } });
        } catch(err) {
            next(err);
            // Como tenemos un middleware más que hemos activado para captura de errores
            // (ver app.js), ya no necesitamos enviar las respuestas fallidas desde el
            // endpoint, simplemente lo delegamos al middleware con next(err)
            // res.status(400).send({ status: 'ERR', payload: { msg: 'todo mal' } });
        }
    });

    // Este endpoint es solo para probar el módulo de compresión
    router.get('/string', async (req, res) => {
        let string = ''
        for (let i = 0; i < 100000; i++) { string += 'CoderHouse'; }
        res.status(200).send({ status: 'OK', payload: string });
    });

    return router;
}