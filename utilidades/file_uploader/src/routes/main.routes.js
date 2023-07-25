import { Router} from 'express';
import mainController from "../controllers/main.controller.js";
import uploader from "../services/uploader.service.js";

export const mainRoutes = () => {
    const router = Router();
    // Inyectamos el uploader como middleware, se encargará de subir el archivo
    // La cadena continuará luego hacia mainController.uploadContent para procesar el resto del body
    // ATENCION!: configurar el enctype del formulario de envío como multipart/form-data
    router.post('/upload', uploader.single('imagen'), mainController.uploadContent);
    return router;
}