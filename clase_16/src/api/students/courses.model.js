import mongoose from 'mongoose';

mongoose.pluralize(null); // Importante! para no tener problemas con Mongoose

const collection = 'courses';

// Ejemplo de colección de cursos con una estructura muy sencilla
// En data pueden encontrar un json para insertar un curso de ejemplo
const schema = new mongoose.Schema({
    title: String,
    description: String,
    professor: String
});

const courseModel = mongoose.model(collection, schema);

export default courseModel;