import { Router } from "express";


const mainRoutes = () => {
    const router = Router();
 
    // API
    router.get('/:word', async (req, res) => {
        res.status(200).send({ status: 'OK', palabra: req.params.word });
    });

    return router;
}

export default mainRoutes;