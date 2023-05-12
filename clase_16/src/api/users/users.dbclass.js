import mongoose from 'mongoose';
import userModel from './users.model.js';

// Como en esta clase estamos enfocados en revisar índices y populate
// dejamos solo un par de métodos para las pruebas

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

    // Solo estamos utilizando este método como medio para las pruebas de índices / populate
    // Lógicamente en un código final de producción volverá simplemente a retornar todos los usuarios
    getUsers = async () => {
        try {
            // Encadenamos el llamado al método explain(), porque en este caso no nos interesa recibir los contenidos
            // sino comparar los tiempos de respuesta con y sin índice habilitado
            // Al consultar veremos un executionTimeMillis que nos indicará el tiempo consumido por la consulta
            // Si intentamos por ejemplo con el criterio first_name: 'Celia', veremos que agrega una pequeña carga extra a la consulta
            const users = await userModel.find().explain('executionStats');
            // const users = await userModel.find({ first_name: 'Celia' }).explain('executionStats');
            
            this.status = 1;
            this.statusMsg = 'Usuarios recuperados';
            return users;
        } catch (err) {
            this.status = -1;
            this.statusMsg = `getUsers: ${err}`;
        }
    }

    getUserById = async (id) => {
        try {
            const user = userModel.findById(id);
            this.status = 1;
            return user;
        } catch (err) {
            this.status = -1;
            this.statusMsg = `getUserById: ${err}`;
        }
    }
}

export default Users;