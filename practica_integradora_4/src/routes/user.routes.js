import { Router } from 'express';
import passport from '../auth/passport.strategies.js';
import applyPolicy from '../auth/local.policies.js'
import { getUsers, getUserById, saveUser } from '../controllers/user.controller.js';

import { body } from 'express-validator';
import errorsDict from '../utils/errors.dict.js';
import { __dirname } from '../utils.js';

// Utilizamos la sintaxis de express-validator para controlar distintos aspectos de los elementos del body
// Inyectaremos este middleware en el endpoint de registro de usuario
const validateCreateFields = [
    body('name').exists().isLength({ min: 2, max: 32 }).withMessage('El nombre debe tener entre 2 y 32 caracteres'),
    body('email').exists().isEmail().withMessage('El formato de mail no es válido'),
    body('pass').exists().isLength({ min: 6, max: 12 }).withMessage('La clave debe tener entre 6 y 12 caracteres')
]

// Este es un ejemplo de middleware para subida de archivos mediante express-fileupload
// que por supuesto puede colocarse también en un archivo por separado e importarse donde se necesite
const handleUploads = (destination, files) => {
    return (req, res, next) => {
        for (const file of files) {
            const fileToUpload = req.files[file]
            
            fileToUpload.mv(`${__dirname}/${process.env.UPLOAD_DIR}/${destination}/${fileToUpload.name}`, function (err) {
                if (err) return res.status(errorsDict.INTERNAL.code).send({ status: 'ERROR', result: 'Error al subir archivos' });
            })
        }

        next()
    }
}

export const userRoutes = ()  => {
    const router = Router();

    // Recordar abstraer todas las rutas que se pueda, delegando el manejo del endpoint
    // al método que corresponda en el controlador
    router.get('/', getUsers);
    router.get('/one/:uid', getUserById);
    
    // La renderización puede hacerse aquí, aunque también sería prolijo abstraerla en
    // métodos del controlador
    router.get('/loginfrm', (req, res) => res.render('login'))
    router.get('/logoutfrm', (req, res) => { req.session.user = {}; res.render('login') })

    // Usamos el esquema de validación antes de derivar a handleUploads y saveUser
    router.post('/', validateCreateFields, handleUploads('profiles', ['avatar']), saveUser);
    // router.post('/', validateCreateFields, uploader.single('avatar'), saveUser);
    
    // Realizamos una autenticación local de usuario inyectando el middleware de passport
    router.post('/login', passport.authenticate('login', { failureRedirect: '/api/users/loginfrm' }), async (req, res) => {
        req.user.pass = ''
        req.session.user = req.user
        
        res.render('private', { user: { name: req.user.name, email: req.user.email } })
    })

    // Realizamos una autorización local de roles inyectando un middleware personalizado
    router.get('/admin', applyPolicy('ADMIN'), (req, res) => {
        res.render('admin', { user: { name: req.session.user.name, email: req.session.user.email } })
    })

    // Endpoint de prueba para Winston, con niveles de error standard
    router.get('/logger_std', (req, res) => {
        req.logger.warn(`${req.method} ${req.url} ${new Date().toLocaleTimeString()}`)
        res.status(200).send({ status: 'OK', data: 'Error de prueba generado' })
    })

    // Endpoint de prueba para Winston, con niveles de error personalizados
    /* router.get('/logger_custom', (req, res) => {
        req.logger.high(`${req.method} ${req.url} ${new Date().toLocaleTimeString()}`)
        res.status(200).send({ status: 'OK', data: 'Error de prueba generado' })
    }) */
    
    return router;
}