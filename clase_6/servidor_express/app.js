/*
Primer ejemplo de servidor HTTP con ExpressJS
*/

const express = require('express');

const PUERTO = 8080;

const server = express();
server.use(express.urlencoded({ extended: true }));

// Solicitud get con retorno txt
server.get('/saludo', (solicitud, respuesta) => {
    respuesta.send('Nuestro primer server con Express!');
});

// Solicitud get con retorno html
server.get('/bienvenida', (req, res) => {
    res.send('<h1 style="color: blue;">Sean todos bienvenidos!</h1>');
});

// Solicitud get con retorno objeto json
server.get('/usuario', (req, res) => {
    res.send({ nombre: 'Carlos', apellido: 'Perren', edad: 48, correo: 'idux.net@gmail.com' });
});

// Solicitud get con parámetro (req.params)
// localhost:8080/bienvenida2/red
server.get('/bienvenida2/:color', (req, res) => {
    res.send(`<h1 style="color: ${req.params.color};">Sean todos bienvenidos!</h1>`);
});

// Solicitud get con retorno de query (req.query)
// localhost:8080/query?nombre=Carlos&apellido=Perren
server.get('/query', (req, res) => {
    res.send(req.query);
});

server.listen(PUERTO, () => {
    console.log(`Servidor Express activo en puerto ${PUERTO}`);
});
