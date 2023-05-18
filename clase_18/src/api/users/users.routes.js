import { Router } from "express";
import userModel from './users.model.js'

const userRouter = Router();

userRouter.get('/users', async (req, res) => {
    try {
        const process = await userModel.find();
        res.status(200).send({ status: 'OK', data: process });
    } catch (err) {
        res.status(500).send({ status: 'ERR', error: err.message });
    }
});

export default userRouter;