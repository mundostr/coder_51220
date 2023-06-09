import CustomRouter from "./custom.routes.js";
import jwt from 'jsonwebtoken';

// UsersRouter extiende de CustomRouter, es decir, "hereda" sus propiedades y métodos, pudiendo agregar o
// sobreescribir como lo hace en este caso con el método init() que está vacío en la clase base
export default class UsersRouter extends CustomRouter {
    init() {
        // Podemos usar por ejemplo el método sendSuccess que personalizamos en CustomRouter
        this.get('/', async (req, res) => {
            res.sendSuccess('Router personalizado operando correctamente');
        });

        // y también el middleware de control de políticas, enviando un array con los niveles de usuario
        // que tienen permitido acceder a la ruta
        this.get('/admin', ['ADMIN', 'DOCTOR'], async (req, res) => {
            res.sendSuccess('Sección solo visible por ADMIN y DOCTOR');
        });

        this.post('/login', async (req, res) => {
            const user = { name: req.body.name, email: req.body.email, role: 'admin' }
            const token = jwt.sign(user, 'abcdefgh12345678', { expiresIn: '24h' });
            res.sendSuccess(token);
        });
    }
}