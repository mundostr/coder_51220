import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';

import mainRoutes from './api/main.router.js';
import { initPassport } from './auth/passport.config.js';

import { __dirname } from './utils.js';

const MONGOOSE_URL = 'mongodb://127.0.0.1:27017/coder51220';
const SERVER_PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Para autenticar vía con jwt y passport, solo necesitamos importar passport en este archivo principal
// y el archivo de estrategias para inicializarlas. Agregamos módulo cookie-parser con secret, para
// poder utilizar el mecanismo alternativo de obtención de token del cliente desde cookie.
app.use(cookieParser('abcdefgh12345678'));
initPassport();
app.use(passport.initialize());

// Routes
app.use('/', mainRoutes());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

// Server
try {
    await mongoose.connect(MONGOOSE_URL);
    app.listen(SERVER_PORT, () => {
        console.log(`Servidor iniciado en puerto ${SERVER_PORT}`);
    });
} catch(err) {
    console.log(`No se puede conectar con el servidor de bbdd (${err.message})`);
}