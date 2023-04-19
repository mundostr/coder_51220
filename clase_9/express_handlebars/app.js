/*
Servidor Express utilizando Router() y motor de plantillas
*/

import express from 'express';
import router from './routes/users.routes.js';
import { __dirname } from './utils.js';
import { engine } from 'express-handlebars';

const PUERTO = 3000;

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/api', router);
server.use('/public', express.static(`${__dirname}/public`));

server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', './views');

server.listen(PUERTO, () => {
    console.log(`Servidor iniciado en puerto ${PUERTO}`);
});
