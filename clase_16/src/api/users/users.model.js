import mongoose from 'mongoose';

mongoose.pluralize(null); // Importante! para no tener problemas con Mongoose

// Esta es una colección de ejemplo con 5000 usuarios
// Hay copia del json para importar en el directorio data
const collection = 'usersbig';

const schema = new mongoose.Schema({
    // Simplemente indicando index: true en el campo, habilitamos la generación y uso de un índice
    // Prueben habilitar y realizar luego las mismas consultas para ver la diferencia en el tiempo de respuesta
    // first_name: { type: String, index: true },
    first_name: { type: String },
    last_name: String,
    email: String,
    gender: String,
});

const userModel = mongoose.model(collection, schema);

export default userModel;