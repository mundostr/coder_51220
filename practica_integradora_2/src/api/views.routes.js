import { Router } from 'express';
import Users from './users/users.dbclass.js';
import Courses from './courses/courses.dbclass.js';

const viewsRouter = () => {
    const router = Router();
    const usersManager = new Users();
    const coursesManager = new Courses();
    
    router.get('/', async(req, res) => {
        const users = await usersManager.getUsers();
        res.render('users', { users });
    })
    
    router.get('/courses', async(req, res) => {
        const courses = await coursesManager.getCourses();
        res.render('courses', { courses });
    })

    return router;
}


export default viewsRouter;