import express from "express";
import rUsers from './api/users/users.routes.js';
import { __dirname } from './utils.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

const PORT = 3000;
const WS_PORT = 8080;

// Servidor Express base
const server = express();
const httpServer = server.listen(WS_PORT, () => {
    console.log(`Servidor socketio iniciado en puerto ${WS_PORT}`);
});
const wss = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
});

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Endpoints API REST
server.use('/api', rUsers);

// Contenidos estáticos
server.use('/public', express.static(`${__dirname}/public`));

// Motor de plantillas
server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', './views');

// Eventos socket.io
wss.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('message', (data) => {
        socket.emit('confirm', 'Mensaje del cliente recibido');
    });
});

server.listen(PORT, () => {
    console.log(`Servidor base API / static iniciado en puerto ${PORT}`);
});
