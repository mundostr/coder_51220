import mongoose from 'mongoose';

mongoose.pluralize(null); // Importante! para no tener problemas con Mongoose

const collection = 'businesses_delivery';

const schema = new mongoose.Schema({
    name: String,
    products: []
});

const businessModel = mongoose.model(collection, schema);

export default businessModel;