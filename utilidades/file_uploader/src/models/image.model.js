import mongoose from 'mongoose';

mongoose.pluralize(null); // Importante! para no tener problemas con Mongoose

const collection = 'images';

const schema = new mongoose.Schema({
    image: { type: String, required: true },
});

const imageModel = mongoose.model(collection, schema);

export default imageModel;