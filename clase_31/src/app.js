/**
 * Servidor Express base, para mostrar el aprovechamiento del módulo Faker-js en la generación de datos de prueba
 */

import cors from 'cors';
import express from 'express';
import { userRoutes } from './routes/user.routes.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: 'GET,PUT,POST',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes());

try {
    app.listen(3000, () => {
        console.log(`Servidor iniciado en puerto 3000`);
    });
} catch(err) {
    console.log(`No se puede iniciar el servidor (${err.message})`);
}