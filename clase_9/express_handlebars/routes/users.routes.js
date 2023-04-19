import { Router } from 'express';

const router = Router();

const users = [
    { firstName: 'Carlos', lastName: 'Perren', age: 48, email: 'idux.net@gmail.com', phone: '+5493492555555', rol: 'admin' },
    { firstName: 'Juan', lastName: 'Perez', age: 40, email: 'jperez@gmail.com', phone: '+5493492555555', rol: 'user' },
    { firstName: 'Pepe', lastName: 'Pompin', age: 12, email: 'ppompin@gmail.com', phone: '+5493492555556', rol: 'admin' }
];

router.get('/users', (req, res) => {
    // res.status(200).send(users);

    const indiceRandom = Math.floor(Math.random() * users.length);
    res.render('index', {
        user: users[indiceRandom],
        isAdmin: users[indiceRandom].rol === 'admin'
    });
});

export default router;
