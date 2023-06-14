import { Router } from 'express';
import Courses from './courses.dbclass.js';

const coursesRouter = () => {
    const router = Router();
    const coursesManager = new Courses();
    
    router.get('/', async(req, res) => {
        const courses = await coursesManager.getCourses();
        res.status(200).send({ status: 'OK', payload: courses });
    })
    
    router.post('/', async(req, res) => {
        const { title, description } = req.body;
        const newCourse = { title: title, description: description, users: [], teacher: 'Sin asignar' }
        const result = await coursesManager.addCourse(newCourse);
        res.status(200).send({ status: 'OK', payload: result });
    })

    return router;
}


export default coursesRouter;