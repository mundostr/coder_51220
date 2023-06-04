import { Router } from "express";
import userModel from "./users/users.model.js";
import { generateToken, authToken } from "../auth/jwt.config.js";

const viewsRoutes = () => {    
    const router = Router();

    router.get('/', async (req, res) => {
        // En este ejemplo solo chequeamos si existe el objeto req.session.user
        // para redireccionar al home o volver a solicitar login
        if (req.session.user === undefined) {
            res.render('login', { sessionInfo: req.session });
        } else {
            res.render('home', { data: req.session });
        }
    });

    router.get('/login', async (req, res) => {
        res.render('login');
    });

    router.get('/registerfrm', async (req, res) => {
        res.render('registerfrm');
    });

    router.get('/logout', async (req, res) => {
        // passport agrega este método logout al objeto req para manejar con más comodidad
        // la destrucción de la sesión
        req.logout((err) => {
            if (err) { return next(err); }
            res.redirect('/');
        });
    });

    // Este es un simple endpoint de ejemplo para uso de tokens (ver jwt.config.js)
    router.get('/tokenonly', authToken, async (req, res) => {
        res.status(200).send({ status: 'OK', msg: 'Este contenido solo es visible para usuarios con token válido' });
    });

    router.post('/register', async (req, res) => {
        const { firstName, lastName, userName, password } = req.body;
        if (!firstName || !lastName || !userName || !password) return res.status(400).send({ status: 'ERR', msg: 'Se requiere objeto con firstName, lastName, userName y password' });

        const user = await userModel.findOne({ userName: userName });
        if (user) return res.status(400).send({ status: 'ERR', msg: 'El email ya se encuentra registrado' });
        
        const newUser = { firstName: firstName, lastName: lastName, userName: userName, password: password } // Qué nos falta acá?
        const process = await userModel.create(newUser);
        delete newUser.password; // Quitamos la password de los datos que van al token
        const token = generateToken(newUser);
        // res.set('Authorization', token);

        res.status(200).send({ status: 'OK', msg: 'Usuario registrado', token: token });
    });

    return router;
}

export default viewsRoutes;