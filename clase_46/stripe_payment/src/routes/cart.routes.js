import { Router } from 'express';
import { checkout } from '../controllers/cart.controller.js';
import { getProducts } from '../controllers/product.controller.js';


export const cartRoutes = ()  => {
    const router = Router();
    
    router.get('/', getProducts)
    router.get('/success', (req, res) => { res.redirect('/success.html') })
    router.get('/cancel', (req, res) => { res.redirect('/cancel.html') })
    
    router.post('/checkout', checkout)
    
    return router
}