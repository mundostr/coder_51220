import { Router } from 'express';

const router = Router();

const users = [];

router.get('/users', (req, res) => {
    res.status(200).send(users);
});

export default router;
