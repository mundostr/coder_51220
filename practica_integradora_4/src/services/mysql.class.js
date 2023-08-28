// Clase singleton para MySQL, garantizando tener siempre una única
// instancia de conexión abierta con el motor de base de datos
// Se usa mediante llamadas al método getInstance() directamente desde el DAO

// Esta clase se carga tan solo como ejemplo para ver con qué facilidad se
// puede instanciar una u otra (MongoDB o MySQL) desde el controlador, sin
// tener que tocar el resto de la lógica.

// Por supuesto podría cambiarse también automáticamente entre un DAO y otro
// mediante una Factory

import mysql from 'mysql2/promise';
import config from '../config.js';


class MysqlSingleton {
    constructor() {
        this.connection = null;
        this.connect();
    }

    async connect() {
        if (this.connection === null) {
            this.connection = await mysql.createConnection({
                host: config.MYSQL_URL,
                user: config.MYSQL_USER,
                password: config.MYSQL_PASS,
                database: config.MYSQL_DB
            })
            
            console.log('Instancia singleton Mysql creada')
        }
    }

    async getInstance() {
        return this.connection;
      }
}

export default new MysqlSingleton();