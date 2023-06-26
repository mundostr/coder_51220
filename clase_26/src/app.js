import express from 'express';
import mongoose from 'mongoose';
import config from './config.js';
import { productRoutes } from './routes/product_routes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', productRoutes());

try {
    await mongoose.connect(config.MONGOOSE_URL);

    app.listen(config.SERVER_PORT, () => {
        console.log(`Servidor iniciado en puerto ${config.SERVER_PORT}`);
    });
} catch(err) {
    console.log(`No se puede iniciar el servidor (${err.message})`);
}