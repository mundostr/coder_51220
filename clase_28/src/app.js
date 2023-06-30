import cors from 'cors';
import express from 'express';
import config from './utils/config.js';
// Importamos directamente la clase MongoSingleton para manejar la conexión con Mongoose
// Si utilizamos el patrón Factory, lo hacemos directamente dentro de factory.js en services
// import MongoSingleton from './services/mongo_class.js'
import { productRoutes } from './routes/product_routes.js';

const app = express();
app.use(express.json());
// Para solucionar errores de orígenes cruzados (CORS = Cross Origin Resource Sharing)
// inyectamos el módulo cors en Express y definimos qué orígenes pueden conectarse a nuestro endpoint.
// En este ejemplo permitimos cualquier origen (*) utilizando método GET, PUT o POST, lógicamente podemos
// ajustarlo para solo aceptar solicitudes desde donde necesitemos.
app.use(cors({
    origin: '*',
    methods: 'GET,PUT,POST',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.urlencoded({ extended: true }));
app.use('/', productRoutes());

try {
    // La singleton nos asegura que siempre tengamos una y solo una instancia de conexión abierta.
    // De nuevo, si utilizamos Factory, este getInstance() se pasa allí.
    // MongoSingleton.getInstance();

    app.listen(config.SERVER_PORT, () => {
        console.log(`Servidor iniciado en puerto ${config.SERVER_PORT}`);
    });
} catch(err) {
    console.log(`No se puede iniciar el servidor (${err.message})`);
}