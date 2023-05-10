import {} from 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';

import router from './api/products/products.routes.js';
import { __dirname } from './utils.js';

const PORT = parseInt(process.env.PORT) || 3000;
const MONGOOSE_URL = process.env.MONGOOSE_URL;

// Instancia del servidor Express
const app = express();

// Parseo correcto de urls
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoints API REST
app.use('/api', router);

// Contenidos estáticos
app.use('/public', express.static(`${__dirname}/public`));

// Motor de plantillas
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

// Activación del servidor
try {
    await mongoose.connect(MONGOOSE_URL);
    
    app.listen(PORT, () => {
        console.log(`Servidor iniciado en puerto ${PORT}`);
    });
} catch(err) {
    console.log('No se puede conectar con el servidor de bbdd');
}