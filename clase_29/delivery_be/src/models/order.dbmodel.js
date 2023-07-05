import mongoose from 'mongoose';

mongoose.pluralize(null); // Importante! para no tener problemas con Mongoose

const collection = 'orders_delivery';

// user y business son campos referenciados para poder utilizar luego populate()
const schema = new mongoose.Schema({
    number: Number,
    business: { type: mongoose.SchemaTypes.ObjectId, ref: 'businesses_delivery' },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'users_delivery' },
    products: [],
    totalPrice: Number,
    completed: { type: Boolean, default: false }
});

const orderModel = mongoose.model(collection, schema);

export default orderModel;