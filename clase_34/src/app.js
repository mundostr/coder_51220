/**
 * Ejemplo de utilización de Winston para logueo persistente.
 * Ya no estamos limitados a utilizar solo consola, podemos también trabajar con
 * archivos locales, remotos y bases de datos.
 * Más info en: https://reflectoring.io/node-logging-winston/
 */

import express from 'express';
// Generamos un servicio para el logging, de esta manera podemos importar el
// middleware y usarlo donde necesitemos.
import { addLogger } from './services/logger.service.js';

const app = express();

app.use(express.json());
// Opción 1: inyectarlo de forma global.
// Cualquier endpoint dispondrá del logger.
// app.use(addLogger);

// Opción 2: inyectarlo solo en los endpoints que se desee.
app.get('/', addLogger, async(req, res) => {
    // Hemos cancelado la línea con warn ya que habilitamos niveles personalizados
    // (ver archivo servicio logger). Si no lo hacemos, podemos emplear los niveles
    // predeterminados (silly, debug, verbose, http, info, warn, error)
    // req.logger.warn('Este es un log verbose que debería loguearse a archivo')
    req.logger.medium(`${req.method} ${req.url} ${new Date().toLocaleTimeString()}`)
    res.status(200).send({ status: 'OK', data: 'Endpoint activo' });
})

app.get('/prueba', async(req, res) => {
    res.status(200).send({ status: 'OK', data: 'Endpoint prueba activo' });
})

try {
    app.listen(3000, () => {
        console.log('Servidor iniciado puerto 3000');
    });
} catch (e) {
    console.log(e.message);
}