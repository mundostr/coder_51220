import { Router } from 'express';
import Users from './users.dbclass.js';
import Courses from '../courses/courses.dbclass.js';
import { createHash } from '../../utils.js';

const usersRouter = () => {
    const router = Router();
    const usersManager = new Users();
    const coursesManager = new Courses();
    
    router.get('/', async(req, res) => {
        const users = await usersManager.getUsers();
        if (!users) return res.status(500).send({ status: 'ERR', error: 'Error interno al obtener usuarios' });
        res.status(200).send({ status: 'OK', payload: users });
    });

    router.get('/:uid', async(req, res) => {
        const user = await usersManager.getUserById(req.params.uid);
        if (!user) return res.status(200).send({ status: 'ERR', error: 'No se encuentra el usuario' });
        res.status(200).send({ status: 'OK', payload: user });
    });
    
    router.post('/', async(req, res) => {
        const { firstName, lastName, userName, password, gender } = req.body;
        if (!firstName || !lastName || !userName || !password || !gender) return res.status(400).send({ status: 'ERR', error: 'Se requieren los campos firstName, lastName, userName, password y gender' });

        const newUser = { firstName: firstName, lastName: lastName, userName: userName, password: createHash(password), gender: gender };
        const result = await usersManager.addUser(newUser);
        if (!result) return res.status(500).send({ status: 'ERR', error: 'Error interno al agregar usuario' });
        res.status(200).send({ status: 'OK', payload: result });
    });

    router.post('/:uid/courses/:cid',async(req,res)=>{
        const { uid, cid } = req.params;
        
        const course = await coursesManager.getCourseById(cid);
        if (!course) return res.status(404).send({ status: 'ERR', error: 'No se encuentra el curso' });
        const user = await usersManager.getUserById(uid);
        if (!user) return res.status(404).send({ status: 'ERR', error: 'No se encuentra el usuario' });

        const courseAlreadyExists = user.courses.some(course => course._id.toString() === cid);
        if (courseAlreadyExists) return res.status(400).send({ status: 'ERR', error: 'El usuario ya se encuentra registrado en ese curso' });

        user.courses.push(course._id);
        course.students.push(user._id);
        await usersManager.updateUser(uid, user);
        await coursesManager.updateCourse(cid, course);
        res.send({ status: 'OK', message: 'Usuario agregado al curso' });
    })

    return router;
}


export default usersRouter;