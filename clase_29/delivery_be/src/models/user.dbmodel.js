import mongoose from 'mongoose';

mongoose.pluralize(null); // Importante! para no tener problemas con Mongoose

const collection = 'users_delivery';

// order es un campo referenciado para poder utilizar luego populate()
const schema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    orders: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'orders_delivery' }]
});

const userModel = mongoose.model(collection, schema);

export default userModel;