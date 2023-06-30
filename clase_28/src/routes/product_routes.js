import { Router } from 'express';
import { addProduct, getProducts, getLargeProcess } from '../controllers/product_controller.js';

// Como vemos el archivo de rutas queda muy limpio, simplemente enlaza a los métodos del controlador
export const productRoutes = ()  => {
    const router = Router();

    router.get('/', getProducts);
    router.get('/large', getLargeProcess);
    router.post('/', addProduct);

    return router;
}