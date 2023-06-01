import { Router } from "express";
import userModel from './users/users.model.js';
import { createHash, isValidPassword } from "../utils.js";
import passport from '../auth/passport.strategies.js';

const mainRoutes = (store) => {    
    const router = Router();

    router.get('/', async (req, res) => {
        store.get(req.sessionID, async (err, data) => {
            if (err) console.log(`Error al recuperar datos de sesión (${err})`);

            if (data !== null && req.sessionStore.userValidated) {
                if (req.sessionStore.userAdmin) {
                    res.render('private_admin', {});
                } else {
                    res.render('private_general', { user: req.sessionStore });
                }
            } else {
                res.render('login', { sessionInfo: req.sessionStore });
            }

        });
    });

    router.get('/ae', async (req, res) => {
        res.render('authentication_err', {});
    });

    router.get('/register', async (req, res) => {
        res.render('registration', {});
    });

    router.post('/login', async (req, res) => {
        req.sessionStore.userValidated = false;
        const { login_email, login_password } = req.body; // Desestructuramos el req.body

        const user = await userModel.findOne({ userName: login_email });

        if (!user) {
            req.sessionStore.errorMessage = 'No se encuentra el usuario';
            res.redirect('http://localhost:3000');
        } else if (!isValidPassword(user, login_password)) {
            req.sessionStore.errorMessage = 'Clave incorrecta';
            res.redirect('http://localhost:3000');
            // res.redirect('http://localhost:3000/ae');
        } else {
            req.sessionStore.userValidated = true;
            req.sessionStore.errorMessage = '';
            req.sessionStore.firstName = user.firstName;
            req.sessionStore.lastName = user.lastName;
            res.redirect('http://localhost:3000');
        }

        /* if (login_email === 'idux.net@gmail.com' && login_password === 'abc123') {
            req.sessionStore.userValidated = true;
            req.sessionStore.errorMessage = '';
            res.redirect('http://localhost:3000');
        } else {
            req.sessionStore.errorMessage = 'Usuario o clave no válidos';
            res.redirect('http://localhost:3000/ae');
        } */
    });

    router.get('/logout', async (req, res) => {
        req.sessionStore.userValidated = false;

        req.session.destroy((err) => {
            req.sessionStore.destroy(req.sessionID, (err) => {
                if (err) console.log(`Error al destruir sesión (${err})`);
                console.log('Sesión destruída');
                res.redirect('http://localhost:3000');
            });
        })
    });

    router.get('/regfail', async (req, res) => {
        res.render('registration_err', {});
    });

    // Solo incluímos passport desde el archivo de estrategias y realizamos la llamada al middleware de autenticación
    // En caso de existir ya el mail en bbdd, redireccionará a /regfail, sino permitirá continuar con /register
    router.post('/register', passport.authenticate('authRegistration', { failureRedirect: '/regfail' }), async (req, res) => {
        const { firstName, lastName, userName, password } = req.body; // Desestructuramos los elementos del body
        if (!firstName || !lastName || !userName || !password ) res.status(400).send('Faltan campos obligatorios en el body');
        const newUser = { firstName: firstName, lastName: lastName, userName: userName, password: createHash(password)};
        
        // const process = userModel.create(newUser);
        res.status(200).send({ message: 'Todo ok para cargar el usuario', data: newUser });
    });

    return router;
}

export default mainRoutes;