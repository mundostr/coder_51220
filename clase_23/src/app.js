import express from 'express';
import mongoose from 'mongoose';

import { __dirname } from './utils.js';
// import mainRoutes from './api/main.routes.js';
// import petsRoutes from './api/pets.routes.js';
import UsersRouter from './api/users.routes.js';

const MONGOOSE_URL = 'mongodb://127.0.0.1:27017/coder51220';
const SERVER_PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
// app.use('/', mainRoutes());
// app.use('/api/pets', petsRoutes());
// UsersRouter no es un paquete de rutas importadas, es una clase, entonces creamos una nueva instancia
const usersRoutes = new UsersRouter();
// y ahora sí, con el método getRouter obtenemos las rutas para usar en el middleware use()
app.use('/api/users', usersRoutes.getRouter());


// Server
try {
    await mongoose.connect(MONGOOSE_URL);
    app.listen(SERVER_PORT, () => {
        console.log(`Servidor iniciado en puerto ${SERVER_PORT}`);
    });
} catch(err) {
    console.log(`No se puede conectar con el servidor de bbdd (${err.message})`);
}