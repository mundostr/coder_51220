import mongoose from 'mongoose';

mongoose.pluralize(null); // Importante! para no tener problemas con Mongoose

const collection = 'courses';

const schema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    teacher: { type: String, required: true },
    students: { type: [ mongoose.Schema.Types.ObjectId ], ref: 'users' }
    // Students guarda un arrays de ids que deben ser ids válidos de la colección users (ref: 'users')
});

const courseModel = mongoose.model(collection, schema);

export default courseModel;