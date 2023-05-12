import mongoose from 'mongoose';
import userModel from './users.model.js';

class Users {
    constructor() {
        this.status = 0;
        this.statusMsg = "inicializado";
    }

    static requiredFields = ['first_name', 'last_name', 'email', 'gender'];

    static #verifyRequiredFields = (obj) => {
        return Users.requiredFields.every(field => Object.prototype.hasOwnProperty.call(obj, field) && obj[field] !== null);
    }

    static #objEmpty (obj) {
        return Object.keys(obj).length === 0;
    }

    checkStatus = () => {
        return this.status;
    }

    showStatusMsg = () => {
        return this.statusMsg;
    }

    getUsers = async () => {
        try {
            // const users = await userModel.find().explain('executionStats');
            const users = await userModel.find();

            this.status = 1;
            this.statusMsg = 'Productos recuperados';
            return users;
        } catch (err) {
            this.status = -1;
            this.statusMsg = `getUsers: ${err}`;
        }
    }
}

export default Users;