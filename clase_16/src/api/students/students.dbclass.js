import mongoose from 'mongoose';
import studentModel from './students.model.js';
// No olvidar la importación del modelo de cursos, Mongoose lo necesita para poder realizar el populate correctamente
import courseModel from './courses.model.js';

class Students {
    constructor() {
        this.status = 0;
        this.statusMsg = "inicializado";
    }

    static requiredFields = ['first_name', 'last_name', 'email', 'gender'];

    static #verifyRequiredFields = (obj) => {
        return Students.requiredFields.every(field => Object.prototype.hasOwnProperty.call(obj, field) && obj[field] !== null);
    }

    static #objEmpty (obj) {
        return Object.keys(obj).length === 0;
    }

    checkStatus = () => {
        return this.status;
    }

    showStatusMsg = () => {
        return this.statusMsg;
    }

    getStudents = async () => {
        try {
            const students = await studentModel.find();
            
            this.status = 1;
            this.statusMsg = 'Estudiantes recuperados';
            return students;
        } catch (err) {
            this.status = -1;
            this.statusMsg = `getStudents: ${err}`;
        }
    }

    getStudentById = async (id) => {
        try {
            // Aprovechamos este método para probar el populate.
            // Cuando solicitemos un estudiante específico, Mongoose recorrerá la matriz courses de ese estudiante,
            // y cruzará lo necesario con la colección courses, para retornar todos los datos en una sola consulta,
            // de eso esencialmente se trata el populate.

            // También podemos habilitar un middleware en el modelo para no tener que realizar el populate acá.
            // De esa forma la consulta queda como antes: const student = await studentModel.find({ _id: id});
            // Ver comentario en students.model.js

            // const student = await studentModel.find({ _id: id});
            const student = await studentModel.find({ _id: id}).populate({ path: 'courses', model: courseModel });
            
            this.status = 1;
            return student[0];
        } catch (err) {
            this.status = -1;
            this.statusMsg = `getStudentById: ${err}`;
        }
    }
}

export default Students;