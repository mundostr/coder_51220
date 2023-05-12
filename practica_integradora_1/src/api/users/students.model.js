import mongoose from 'mongoose';

mongoose.pluralize(null);
const collection = 'students';

const schema = new mongoose.Schema({
    first_name: { type: String, index: true },
    last_name: String,
    email: String,
    gender: String,
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'courses'}]
});

const studentModel = mongoose.model(collection, schema);

export default studentModel;