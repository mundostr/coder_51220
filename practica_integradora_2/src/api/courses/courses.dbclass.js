import mongoose from 'mongoose';
import courseModel from './courses.model.js';

class Courses {
    constructor() {
        this.status = 0;
        this.statusMsg = "inicializado";
    }

    static requiredFields = ['title', 'description', 'teacher'];

    static #verifyRequiredFields = (obj) => {
        return Courses.requiredFields.every(field => Object.prototype.hasOwnProperty.call(obj, field) && obj[field] !== null);
    }

    static #objEmpty (obj) {
        return Object.keys(obj).length === 0;
    }

    addCourse = async (course) => {
        try {
            if (!Courses.#objEmpty(course) && Courses.#verifyRequiredFields(course)) {
                const process = await courseModel.create(course);
                this.status = 1;
                this.statusMsg = "Curso registrado en bbdd";
            } else {
                this.status = -1;
                this.statusMsg = `Faltan campos obligatorios (${Courses.requiredFields.join(', ')})`;
            }
        } catch (err) {
            this.status = -1;
            this.statusMsg = `AddCourse: ${err.message}`;
        }
    }

    getCourses = async () => {
        try {
            const courses = await courseModel.find().populate('students').lean();
            this.status = 1;
            this.statusMsg = 'Cursos recuperados';
            return courses;
        } catch (err) {
            this.status = -1;
            this.statusMsg = `getCourses: ${err}`;
        }
    }

    getCourseById = async (id) => {
        try {
            this.status = 1;
            const course = courseModel.findById(id).populate('students').lean();
            return course;
        } catch (err) {
            this.status = -1;
            this.statusMsg = `getCourseById: ${err.message}`;
        }
    }

    updateCourse = async (id, data) => {
        try {
            if (data === undefined || Object.keys(data).length === 0) {
                this.status = -1;
                this.statusMsg = 'Se requiere body con data';
            } else {
                // Con mongoose.Types.ObjectId realizamos el casting para que el motor reciba el id en el formato correcto
                const process = await courseModel.updateOne({ '_id': new mongoose.Types.ObjectId(id) }, data);
                this.status = 1;
                process.modifiedCount === 0 ? this.statusMsg = 'El ID no existe o no hay cambios por realizar': this.statusMsg = 'Curso actualizado';
            }
        } catch (err) {
            this.status = -1;
            this.statusMsg = `updateCourse: ${err.message}`;
        }
    }

    deleteCourse = async (id) => {
        try {
            const process = await courseModel.deleteOne({ '_id': new mongoose.Types.ObjectId(id) });
            this.status = 1;
            process.deletedCount === 0 ? this.statusMsg = "El ID no existe": this.statusMsg = "Curso borrado";
        } catch (err) {
            this.status = -1;
            this.statusMsg = `deleteCourse: ${err.message}`;
        }
    }
}

export default Courses;