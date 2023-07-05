import mongoose from 'mongoose';
import config from '../utils/config.js';


// Clase Singleton para garantizar siempre una instancia única de conexión con el motor MongoDB
export default class MongoSingleton {
    static #instance;

    constructor() {
        mongoose.connect(config.MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new MongoSingleton();
            console.log('Conexión bbdd CREADA');
        } else {
            console.log('Conexión bbdd RECUPERADA');
        }

        return this.#instance;
    }
}