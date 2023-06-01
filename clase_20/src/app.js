import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from './auth/passport.strategies.js';

import { __dirname } from './utils.js';

import mainRoutes from './api/main.routes.js';

const MONGOOSE_URL = 'mongodb://127.0.0.1:27017/coder51220';
const SERVER_PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const store = MongoStore.create({ mongoUrl: MONGOOSE_URL, mongoOptions: {}, ttl: 30 });
app.use(session({
    store: store,
    secret: 'abcdefgh12345678',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
    // cookie: { maxAge: 30 * 1000 }, // la sesión expira luego de 30 segundos de INACTIVIDAD
}));

// Auth (passport)
// Solo incluímos passport desde el archivo de estrategias y lo inicializamos
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', mainRoutes(store));

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