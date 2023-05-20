/*
Introducción a cookies y sessions
*/

import {} from 'dotenv/config'

import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import userRouter from './api/users/users.routes.js';

import { __dirname } from './utils.js';

// recordar generar un archivo de entorno .env con la variable PORT
// y utilizar la importación de dotenv config como primer línea arriba
const PORT = parseInt(process.env.PORT) || 3000;
const MONGOOSE_URL = process.env.MONGOOSE_URL;
const COOKIE_SECRET = 'abcd1234';

// Servidor Express y Socket.io compartiendo puerto
const app = express();

// Parseo correcto de urls
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parseo de cookies
app.use(cookieParser(COOKIE_SECRET));

// Manejo de sesiones
app.use(session({
    secret: COOKIE_SECRET,
    resave: true,
    saveUninitialized: true
}));

// Endpoints API REST
app.use('/api', userRouter);

// Contenidos estáticos
app.use('/public', express.static(`${__dirname}/public`));

// Motor de plantillas
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

// Activación del servidor
try {
    await mongoose.connect(MONGOOSE_URL);

    app.listen(PORT, () => {
        console.log(`Servidor iniciado en puerto ${PORT}`);
    });
} catch(err) {
    console.log(err.message);
}