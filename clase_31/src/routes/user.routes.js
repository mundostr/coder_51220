import { Router } from 'express';
import { generateUser } from '../utils.js';

export const userRoutes = ()  => {
    const router = Router();

    // Este endpoint genera un array de 10 usuarios al azar, aprovechando
    // la utilidad generateUser() en utils.js
    router.get('/', (req, res) => {
        const users = [];
        for (let i = 0; i < 10; i++) { users.push(generateUser()) }
        res.send({ status: 'OK', payload: users });
    });

    return router;
}