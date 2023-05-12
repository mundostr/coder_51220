import { Router } from "express";
import Users from './users.dbclass.js';

// Como en esta clase estamos enfocados en revisar índices y populate
// dejamos solo un endpoint GET para las pruebas, con un parámetro :id? opcional (por eso el ?)
// Si hay id, llamamos al método getUserById(), y sino a getUsers()

const router = Router();
const manager = new Users();

router.get('/users/:id?', async (req, res) => {
    try {
        if (req.params.id === undefined) {
            const users = await manager.getUsers();
            res.status(200).send({ status: 'OK', data: users });
        } else {
            const user = await manager.getUserById(req.params.id);
            res.status(200).send({ status: 'OK', data: user });
        }
    } catch (err) {
        res.status(500).send({ status: 'ERR', error: err });
    }
});

export default router;