import { Router } from 'express';
import { checkout } from '../controllers/cart.controller.js';
import { getProducts } from '../controllers/product.controller.js';


export const cartRoutes = ()  => {
    const router = Router();
    
    router.get('/', getProducts)
    
    // Estas dos rutas serán llamadas por el proceso de callback de Stripe,
    // según como haya resultado el pago, mostrando la página estática correspondiente
    router.get('/success', (req, res) => { res.redirect('/success.html') })
    router.get('/cancel', (req, res) => { res.redirect('/cancel.html') })
    
    // Esta ruta será llamada por el frontend al Comprar
    router.post('/checkout', checkout)
    
    return router
}