/*
Ejemplo de uso req.params y req.query en ExpressJS
*/

const express = require('express');

const PUERTO = 8080;
const USUARIOS = [
    { id: 1, nombre: 'Usuario', apellido: 'Uno', edad: 20, genero: 'M' },
    { id: 2, nombre: 'Usuario', apellido: 'Dos', edad: 40, genero: 'F' },
    { id: 3, nombre: 'Usuario', apellido: 'Tres', edad: 30, genero: 'M' },
];

const server = express();
server.use(express.urlencoded({ extended: true }));

// Simplemente devuelve todos los usuarios de la matriz
server.get('/', (req, res) => {
    res.send(USUARIOS);
});

// Ejemplo req.params
// : indica un parámetro a enviar en la solicitud
// ? modifica a parámetro opcional
// Se puede acceder como localhost:8080/3
server.get('/:id?', (req, res) => {
    if (req.params.id === undefined) {
        res.send(USUARIOS);
    } else {
        const id = parseInt(req.params.id);
        const usuario = USUARIOS.find((item) => { return item.id === id });
        res.send(usuario);
    }
});

// Ejemplo req.query
// Se puede acceder como localhost:8080/q?genero=m
server.get('/q', (req, res) => {
    if (req.query.genero === undefined) {
        res.send(USUARIOS);
    } else {
        const genero = req.query.genero.toUpperCase();
        if (genero === 'M' || genero === 'F') {
            const usuarios = USUARIOS.filter((item) => { return item.genero === genero });
            res.send(usuarios);
        } else {
            res.send('Género no soportado');
        }
    }
});

server.listen(PUERTO, () => {
    console.log(`Servidor Express activo en puerto ${PUERTO}`);
});
