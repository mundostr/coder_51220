const express = require('express');
const uploader = require('../utils');

// Generamos una instancia del router en lugar de usar los métodos tradicionales de express
const router = express.Router();

const users = [];

// Esta es una simple función diseñada como ejemplo de Middleware (ver abajo)
const reportarTiempo = (req, res, next) => {
    console.log(`Timestamp actual: ${Date.now()}`);
    // Importante llamar a next() para continuar la "cadena" del endpoint
    next();
}

const verificarRequeridos = (obj, obligatorios) => {
    return obligatorios.every(campo => Object.prototype.hasOwnProperty.call(obj, campo) && obj[campo] !== '' );
}

router.get('/users', (req, res) => {
    res.status(200).send(users);
});

// Un middleware no es más que una función que "enganchamos" en el medio del flujo de nuestro endpoint
// router.post('/users', reportarTiempo, (req, res) => {
// En este caso uploader.single() es utilizado como middleware (recordemos que uploader está siendo
// requerido más arriba desde el archivo utils.js, el cual utiliza el módulo externo multer para manejar archivos).
// Se me "en medio" del proceso del endpoint, y se encarga de gestionar la parte que corresponde al almacenamiento
// del archivo en sí, luego continúa la "cadena" y el endpoint procesa el resto (push, etc).
router.post('/users', uploader.single('file'), (req, res) => {
    req.body.saldo = parseInt(req.body.saldo);
    users.push(req.body);
    if (req.file) { console.log(req.file) }
    res.status(200).send({ estado: 'ok', mensaje: 'usuario registrado' });
});

// Importante no olvidar exportar el objeto para poder requerirlo en app.js
module.exports = router;
