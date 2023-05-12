import mongoose from 'mongoose';

mongoose.pluralize(null); // Importante! para no tener problemas con Mongoose
const collection = 'products';

const schema = new mongoose.Schema({
    id: Number,
    description: { type: String, required: true },
    price: Number,
    stock: Number
});

const productModel = mongoose.model(collection, schema);

export default productModel;