import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import { engine } from 'express-handlebars';

import viewsRoutes from './api/views.router.js';
import sessionRoutes from './api/session.router.js';

import { __dirname } from './utils.js';

const MONGOOSE_URL = 'mongodb://127.0.0.1:27017/coder51220';
const SERVER_PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'abcdefgh12345678',
    resave: false,
    saveUninitialized: true,
}));

// Auth
// Aquí en la app, solo importamos e inicializamos passport
app.use(passport.initialize());

// Routes
app.use('/', viewsRoutes());
app.use('/api/sessions', sessionRoutes());

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