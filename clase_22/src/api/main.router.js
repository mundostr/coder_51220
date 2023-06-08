import { Router } from "express";
import userModel from "./users/users.model.js";
import { generateToken, authToken } from "../auth/jwt.config.js";
import { isValidPassword } from "../utils.js";
// import passport from "passport";
import { authentication, authorization } from '../auth/passport.config.js';

/*
Probamos distintas alternativas de autenticación:
1) Usando módulo jswonwebtoken, toda la config en jwt.config.js:
generateToken: genera un token firmado
authToken: autentica en base a un token recibido en los headers de la solicitud

2) Usando passport, toda la config en passport.config.js (ver endpoints al final):
a) /current1: llamada al método passport.authenticate de forma directa.
b) /current2: autenticación con método personalizado authentication, que llama internamente a passport.authenticate
c) /current3: agregado de 2do middleware authorization, para una primer aproximación a autorización por roles.

*/

const mainRoutes = () => {
    const router = Router();

    // Vistas
    router.get('/', async (req, res) => {
        const authenticated = req.headers.authorization ? true : false;
        res.render('home', { authenticated: authenticated });
    });

    router.get('/private', authToken, async (req, res) => {
        res.status(200).send({ status: 'OK', data: 'Credenciales autorizadas para visualizar contenido privado' });
    });

    router.get('/login', async (req, res) => {
        res.render('login', {});
    });

    
    // API
    router.post('/login', async (req, res) => {
        const { login_email, login_password } = req.body; // Desestructuramos el req.body

        const user = await userModel.findOne({ userName: login_email });

        if (!user) { // No se encuentra el mail en la bbdd, no hace falta validar clave
            res.redirect('/login');
        } else {
            if (!isValidPassword(user.password, login_password)) {
                res.redirect('/login');
            } else {
                const date = new Date();

                // Se genera token, pasándole firstName, lastName y userName para el payload
                const userdataForToken = { firstName: user.firstName, lastName: user.lastName, userName: user.userName, role: 'normal_user' };
                const token = generateToken(userdataForToken, '24h');
                
                // En lugar de enviar el token directamente en la respuesta, se adjunta como cookie para el navegador.
                // Importante activar la opción httpOnly para incrementar la seguridad.
                res.cookie('coder_login_token', token, {
                    maxAge: date.setDate(date.getDate() + 1),
                    secure: false, // true para operar solo sobre HTTPS
                    httpOnly: true
                }).send({ status: 'Usuario autenticado y token generado' });
            }
        }
    });

    router.get('/logout', async (req, res) => {
        res.clearCookie('coder_login_token');
        res.redirect('/login');
    });

    router.get('/current1', passport.authenticate('jwtAuth', { session: false }), async (req, res) => {
        res.send({ status: 'OK', data: req.user });
    });

    router.get('/current2', authentication('jwtAuth'), async (req, res) => {
        res.send({ status: 'OK', data: req.user });
    });

    router.get('/current3', authentication('jwtAuth'), authorization('normal_user'), async (req, res) => {
        res.send({ status: 'OK', data: req.user });
    });
    
    return router;
}

export default mainRoutes;