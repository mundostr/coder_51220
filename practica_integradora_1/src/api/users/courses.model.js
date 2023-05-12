import mongoose from 'mongoose';

mongoose.pluralize(null);
const collection = 'courses';

const schema = new mongoose.Schema({
    title: String,
    description: String,
    professor: String,
});

const courseModel = mongoose.model(collection, schema);

export default courseModel;