import mongoose from 'mongoose';
import courseModel from './courses.model.js';

mongoose.pluralize(null); // Importante! para no tener problemas con Mongoose

const collection = 'students';

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    // Esta es la parte diferente. Agregamos un campo courses, que es un array
    // de ids (type: [ mongoose.Schema.Types.ObjectId ]) de cursos que se encuentren en la colección courses
    // Esto servirá de referencia a Mongoose cuando se invoque el método populate, de esa manera en una sola consulta
    // podrá retornar no solo los datos del estudiante, sino también los de los cursos que tenga asociados
    courses: {
        type: [ mongoose.Schema.Types.ObjectId ],
        ref: 'courses'
    }
});

// Podemos habilitar este middleware para hacer el populate automáticamente
// De esta forma la cadena de la consulta original nos queda más limpia
// No olvidar importar el modelo de courses (courseModel) Y NO utilizar la notación de arrow function,
// para evitar problemas con this

/* schema.pre('find', function() {
    this.populate({ path: 'courses', model: courseModel });
}); */

const studentModel = mongoose.model(collection, schema);

export default studentModel;