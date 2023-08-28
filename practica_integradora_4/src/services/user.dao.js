import MongoSingleton from '../services/mongo.class.js'
import userModel from '../models/user.dbmodel.js';

MongoSingleton.getInstance();

export default class User {
    getUsers = async () => {
        try {
            return await userModel.find();
        } catch(err) {
            console.error(err.message);
            return null;
        }
    }

    getUserById = async (id) => {
        try {
            return await userModel.findOne({ _id: id });
        } catch(err) {
            console.error(err.message);
            return null;
        }
    }

    getUserByEmail = async (email) => {
        try {
            return await userModel.findOne({ email: email });
        } catch(err) {
            console.error(err.message);
            return null;
        }
    }

    saveUser = async (user) => {
        try {
            return await userModel.create(user);
        } catch(err) {
            console.error(err.message);
            return null;
        }
    }

    updateUser = async (id, user) => {
        try {
            return await userModel.updateOne({ _id: id }, {$set: user });
        } catch(err) {
            console.error(err.message);
            return null;
        }
    }
}