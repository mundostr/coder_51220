import mongoose from 'mongoose';

mongoose.pluralize(null); // Importante! para no tener problemas con Mongoose

const collection = 'users';

const schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['F', 'M'], default: 'F'},
    avatar: String,
    courses: { type: [ mongoose.Schema.Types.ObjectId ], ref: 'courses' }
    // Courses guarda un arrays de ids que deben ser ids válidos de la colección courses (ref: 'courses')
});

// Podemos habilitar este middleware para hacer el populate automáticamente
// De esta forma la cadena de la consulta original nos queda más limpia
// No olvidar importar el modelo de courses arriba Y NO utilizar la notación de arrow function

/* schema.pre('find', function() {
    this.populate({ path: 'courses', model: courseModel });
}); */

const userModel = mongoose.model(collection, schema);

export default userModel;