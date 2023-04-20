import express from "express";
import rUsers from './api/users/users.routes.js';
import { __dirname } from './utils.js';
import { engine } from 'express-handlebars';

const PORT = 3000;

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/api', rUsers);
server.use('/public', express.static(`${__dirname}/public`));

server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', './views');

server.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});
