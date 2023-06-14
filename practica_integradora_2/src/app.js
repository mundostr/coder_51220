/*
Práctica integradora II, incluye
- Uso de refs / population en Mongoose.
- Seteo y limpieza de cookies
- Repaso de activación y uso de sesiones en servidor
- Alternativa de autenticación vía tokens con jsonwebtoken o passport
- Middlewares de autenticación con passport
- Middlewares de autorización (PENDIENTE DE PUBLICAR)
*/

import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';

import { __dirname } from './utils.js';

import viewsRouter from './api/views.routes.js';
import sessionRouter from './api/sessions.routes.js';
import usersRouter from './api/users/users.routes.js';
import coursesRouter from './api/courses/courses.routes.js';
import initializePassport from './auth/passport.config.js';

const PORT = 3000;
const MONGOOSE_URL = 'mongodb://127.0.0.1:27017/coder51220';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializePassport();
app.use(passport.initialize());
app.use(cookieParser());

// Activación de sessions
// Recordar que puede optarse por utilizar sessions o tokens en la presentación de proyectos
const store = MongoStore.create({ mongoUrl: MONGOOSE_URL, mongoOptions: {}, ttl: 30 });
app.use(session({
    store: store,
    secret: 'abcdefgh12345678',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
    // cookie: { maxAge: 30 * 1000 }, // la sesión expira luego de 30 segundos de INACTIVIDAD
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use('/', viewsRouter());
app.use('/api/users', usersRouter());
app.use('/api/courses', coursesRouter());
app.use('/api/sessions', sessionRouter());

app.use('/public', express.static(`${__dirname}/public`));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

try {
    await mongoose.connect(MONGOOSE_URL);
    
    app.listen(PORT, () => {
        console.log(`Servidor iniciado en puerto ${PORT}`);
    });
} catch(err) {
    console.log('No se puede conectar con el servidor de bbdd');
}