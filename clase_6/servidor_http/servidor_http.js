/*
Ejemplo de servidor HTTP simple con módulo nativo http
*/

const http = require('http');

const PUERTO = 8080;

const servidor = http.createServer((solicitud, respuesta) => {
    respuesta.end('Mi primer servidor desde NodeJS!');
});

servidor.listen(PUERTO, () => {
    console.log(`Servidor http activo en puerto ${PUERTO}`)
});
