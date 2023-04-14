/*
Servidor Express utilizando Router()
*/

const express = require('express');
// Los endpoints relativos al manejo de usuarios, se mantienen en archivo aparte
const router = require('./routes/users.routes');

const PUERTO = 3000;

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Podemos ver que el archivo principal queda mucho más limpio
// "Delegamos" el manejo de la API a un router armado por separado, y aprovechamos también
// la funcionalidad static para habilitar un directorio /public donde podemos servir contenido almacenado.
server.use('/api', router);
server.use('/public', express.static(`${__dirname}/public`));

server.listen(PUERTO, () => {
    console.log(`Servidor iniciado en puerto ${PUERTO}`);
});
