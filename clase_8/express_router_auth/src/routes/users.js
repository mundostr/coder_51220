/*
Routes manejo usuarios
*/

import { Router } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const router = Router();

const SECRETO_JWT = 'abcd1234';

// Clave encriptada para Admin
const encriptarClave = (clave) => {
    return crypto.createHash('sha256').update(SECRETO_JWT + clave).digest('hex');
};
const claveAdminHash = encriptarClave('123456');

const ADMIN = { usuario: 'admin', clave: claveAdminHash };
const users = [];

const autenticar = (req, res, next) => {
    // Si no hay headers de autorización, volvemos con un error
    const authInfo = req.headers.authorization;
    if (!authInfo) return res.status(400).send({ estado: 'ERROR', mensaje: 'No se indicó token' });

    // Sino separamos la info para obtener el token y verificarlo
    const token = authInfo.split(' ')[1];
    jwt.verify(token, SECRETO_JWT, (err, dec) => {
        if (err) return res.status(401).send({ estado: 'ERROR', mensaje: 'El token no es válido o ha expirado' });

        req.user = dec;
        next();
    });
};

router.get('/users', (req, res) => {
    res.status(200).send(users);
});

router.post('/login', (req, res) => {
    // Si no hay datos en el body, volvemos con un error, sino los desestructuramos
    if (req.body === undefined) return res.status(400).send({ estado: 'ERROR', mensaje: 'Se requiere usuario y clave' });
    const { usuario, clave } = req.body;

    if (usuario !== ADMIN.usuario || encriptarClave(clave) !== ADMIN.clave) return res.status(401).send({ estado: 'ERROR', mensaje: 'Datos no válidos' });
    const token = jwt.sign({ usuario }, SECRETO_JWT, { expiresIn: '60s' });
    
    res.status(200).send({ estado: 'OK', mensaje: 'Token generado', token: token });
});

router.post('/users', autenticar, (req, res) => {
    if (req.user) {
        res.status(200).send({ estado: 'OK', mensaje: `Autorizado como usuario ${req.user.usuario}` });
    } else {
        res.status(401).send({ estado: 'ERROR', mensaje: 'Problema de autorización' });
    }
});

export default router;
