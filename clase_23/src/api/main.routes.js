import { Router } from "express";


const ALLOWED_CODES = ['abc123', 'abc124', 'abc125'];


const mainRoutes = () => {
    const router = Router();
 
    // API
    
    // Opción 1: indicar el regex directamente en el param
    // Ejemplo regex, 0 o más letras seguidas de números
    router.get('/reg1/:code([a-zA-Z]*[0-9]+)', async (req, res) => {
        res.status(200).send({ status: 'OK', code: req.params.code });
    });
    
    // Opción 2: procesar el regex dentro
    /* router.get('/reg2/:code', async (req, res) => {
        // Observar que pattern NO es una cadena de caracteres, es una expresión regular (regex),
        // para esto en Javascript encerramos el patrón entre barras (/)
        const pattern = /[a-zA-Z]*[0-9]+/;
        
        // El método test nos permite probar el patrón contra lo que se ingresa, para saber si verifica o no
        if (pattern.test(req.params.code)) {
            res.status(200).send({ status: 'VALID', code: req.params.code });
        } else {
            res.status(400).send({ status: 'INVALID', msg: 'El formato de código no es válido' });
        }
    }); */

    // Capturamos las solicitudes fallidas a las rutas anteriores
    router.get('*', async (req, res) => {
        res.status(404).send({ status: 'ERROR', msg: 'No se puede procesar la solicitud' });
    });

    // param es un middleware que podemos procesar para realizar tareas generales sobre cualquier parámetro
    // sin importar el tipo de solicitud (GET, POST, PUT, DELETE, etc).
    // En este caso, revisará si code está incluído en un array de códigos permitidos
    router.param('code', async (req, res, next, code) => {
        if (ALLOWED_CODES.includes(code)) {
            req.params.code = `${code}-included`;
        } else {
            req.params.code = `${code}-not-included`;
        }

        next();
    });

    return router;
}

export default mainRoutes;