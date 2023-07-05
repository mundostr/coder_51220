import { Router } from 'express';
import { getOrders, getOrderById, createOrder, resolveOrder } from '../controllers/order.controller.js';

// Solo importamos los métodos desde el controlador y asignamos a las rutas que deseamos activar
export const orderRoutes = () => {
    const router = Router();

    router.get('/', getOrders);
    router.post('/', createOrder);
    router.get('/:oid', getOrderById);
    router.put('/:oid', resolveOrder);

    return router;
}