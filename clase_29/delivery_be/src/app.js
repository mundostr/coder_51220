import cors from 'cors';
import express from 'express';
import config from './utils/config.js';
import MongoSingleton from './services/mongo_class.js'
import { userRoutes } from './routes/user.routes.js';
import { orderRoutes } from './routes/order.routes.js';
import { businessRoutes } from './routes/business.routes.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: config.ALLOWED_ORIGINS, // Ejemplo de orígenes recuperados desde variables de entorno
    methods: 'GET,PUT,POST',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes());
app.use('/api/orders', orderRoutes());
app.use('/api/businesses', businessRoutes());

try {
    // Mantenemos el uso de la clase tipo singleton para la conexión a la base de datos
    MongoSingleton.getInstance();

    app.listen(config.SERVER_PORT, () => {
        console.log(`Servidor iniciado en puerto ${config.SERVER_PORT}`);
    });
} catch(err) {
    console.log(`No se puede iniciar el servidor (${err.message})`);
}