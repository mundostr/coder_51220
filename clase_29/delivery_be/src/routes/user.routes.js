import { Router } from 'express';
import { getUsers, getUserById, saveUser } from '../controllers/user.controller.js';

// Solo importamos los métodos desde el controlador y asignamos a las rutas que deseamos activar
export const userRoutes = ()  => {
    const router = Router();

    router.get('/', getUsers);
    router.get('/:uid', getUserById);
    router.post('/', saveUser);

    return router;
}