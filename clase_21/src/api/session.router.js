import { Router } from "express";
import passport from "passport";
import initializePassport from '../auth/passport.config.js';

initializePassport();

const sessionRoutes = () => {    
    const router = Router();

    // Simplemente importamos la estrategia configurada y la insertamos como middleware en las rutas
    // donde queremos utilizarla
    router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
        // Vacío
    });

    router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

    return router;
}

export default sessionRoutes;