import { Router } from "express";
import Users from './users.dbclass.js';

const router = Router();
const manager = new Users();

router.get('/users', async (req, res) => {
    try {
        const data = await manager.getUsers();
        res.status(200).send({ status: 'OK', data: data });
    } catch (err) {
        res.status(500).send({ status: 'ERR', error: err });
    }
});

export default router;