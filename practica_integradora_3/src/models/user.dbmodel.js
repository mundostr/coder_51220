// Un archivo de modelo Mongoose muy standard
// Recordar el uso de enum para restringir los posibles valores de un campo a una lista
// y el de ObjectId y refs para habilitar referencias a otras colecciones que permitan
// utilizar el populate característico de MongoDB

import mongoose from 'mongoose';

mongoose.pluralize(null);

const collection = 'users_delivery';

const schema = new mongoose.Schema({
    autoId: String,
    name: String,
    email: String,
    pass: String,
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    orders: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'orders_delivery' }]
});

const userModel = mongoose.model(collection, schema);

export default userModel;