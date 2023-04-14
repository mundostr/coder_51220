/*
Ejemplo express con uso de router y autenticación vía JWT (Json Webtokens)
Agregado "type" = "module" en package.json para utilizar sintaxis import
*/

import express from 'express';
import rUser from './routes/users.js';

const PUERTO = 3000;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/api', rUser);

server.listen(PUERTO, () => {
    console.log(`Servidor iniciado en puerto ${PUERTO}`)
});
