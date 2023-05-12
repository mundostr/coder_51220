import { Router } from "express";
import Students from './students.dbclass.js';

const router = Router();
const manager = new Students();

router.get('/students/:id?', async (req, res) => {
    try {
        if (req.params.id === undefined) {
            const students = await manager.getStudents();
            res.status(200).send({ status: 'OK', data: students });
        } else {
            const student = await manager.getStudentById(req.params.id);
            res.status(200).send({ status: 'OK', data: student });
        }
    } catch (err) {
        res.status(500).send({ status: 'ERR', error: err.message });
    }
});

export default router;