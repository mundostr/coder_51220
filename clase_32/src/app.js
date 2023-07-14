/**
 * Servidor Express base, para prueba de compresión y manejo personalizado de errores
 */

import cors from 'cors';
import express from 'express';
import compression from 'express-compression';
import { userRoutes } from './routes/user.routes.js';
import CustomError from './services/customError.js';
import errorsDict from './utils/dictionary.js';

const app = express();

// Con solo importar el módulo compression y aplicarlo con el middleware use()
// dispondremos de compresión GZIP en cualquier endpoint
app.use(compression()); // En este caso, sin indicar config, utilizamos GZIP por defecto
// Alternativamente podemos utilizar Brotli y otras configs
// app.use(compression({ brotli: {enabled: true, zlib: {}} })); // En este caso, habilitamos BROTLI
// Importante!: cotejar siempre el nivel de ahorro de tráfico vs el consumo de recursos de compresión
// para definir según el tipo de contenido a enviar, si vale la pena activarlo.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*', methods: 'GET,PUT,POST', allowedHeaders: 'Content-Type,Authorization' }));
app.use('/api/users', userRoutes());

// Este middleware nos permite capturar cualquier solicitud a endpoint no habilitado y gestionar
// un error y demás procesos que deseemos realizar (registro de logueo, etc)
app.all('*', (req, res, next) => {
    throw new CustomError(errorsDict.ROUTING_ERROR);
});

// Agregando un primer parámetro para un objeto de error, podemos generar un middleware para capturar
// cualquier error y unificar el formato con el cual notificamos por ejemplo.
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).send({ status: 'ERR', payload: { msg: err.message } });
});

try {
    app.listen(3000, () => {
        console.log(`Servidor iniciado en puerto 3000`);
    });
} catch(err) {
    console.log(`No se puede iniciar el servidor (${err.message})`);
}