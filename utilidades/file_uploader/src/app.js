/**
 * Ejemplo de uso de servicio para upload de archivos con Multer
 * con carga a directorio local y colección MongoDB
 */

import express from 'express';
import mongoose from 'mongoose';

import { mainRoutes } from './routes/main.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGOOSE_URL = 'mongodb://127.0.0.1:27017/coder51220';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', mainRoutes());

try {
    await mongoose.connect(MONGOOSE_URL);

    app.listen(PORT, () => {
        console.log(`Servidor iniciado en puerto ${PORT}`);
    });
} catch(err) {
    console.log(`No se puede iniciar el servidor (${err.message})`);
}