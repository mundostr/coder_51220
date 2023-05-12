import mongoose from 'mongoose';

mongoose.pluralize(null);
const collection = 'users';

const schema = new mongoose.Schema({
    first_name: { type: String, index: true },
    last_name: String,
    email: String,
    gender: String
});

const userModel = mongoose.model(collection, schema);

export default userModel;