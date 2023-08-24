/**
 * Servicio de upload mediante Multer
 */

import multer from 'multer';
import { __dirname } from '../utils.js';

// Configuramos con el método diskStorage el directorio destino
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/uploads`);
    },

    filename: (req, file, cb) => {
        // Optamos por utilizar el nombre original de archivo, en un código
        // de producción normalmente se realizará aquí una verificación del contenido
        // y se rearmará el nombre
        cb(null, file.originalname);
    },
});

const uploader = multer({ storage });

export default uploader;