// Clase singleton para MongoDB, garantizando tener siempre una única
// instancia de conexión abierta con el motor de base de datos
// Se usa mediante llamadas al método getInstance() directamente desde el DAO

import mongoose from 'mongoose';
import config from '../config.js';


export default class MongoSingleton {
    static #instance;

    constructor() {
        mongoose.connect(config.MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new MongoSingleton();
            console.log('Instancia singleton Mongo creada')
        } else {
        }

        return this.#instance;
    }
}