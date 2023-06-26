import { Router } from 'express';
import { addProduct, getProducts, getLargeProcess } from '../controllers/product_controller.js';

export const productRoutes = ()  => {
    const router = Router();

    router.get('/', getProducts);
    router.get('/large', getLargeProcess);
    router.post('/', addProduct);

    return router;
}