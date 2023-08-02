// Clase con métodos MySQL de ejemplo, utilizando SQL para las consultas
// como es habitual en las bases relacionales
// Simplemente a título de ejemplo para probar el cambio entre un DAO y otro en el
// controlador, ya que en este curso estamos enfocados en MongoDB.

import MysqlSingleton from '../services/mysql.class.js'


export default class User {
    getUserByEmail = async (email) => {
        try {
            const conn = await MysqlSingleton.getInstance()
            const result = await conn.query(`SELECT * FROM users_delivery WHERE email = ?`, [email])
            return result[0].length === 0 ? false : true
        } catch(err) {
            console.error(err.message);
            return null;
        }
    }

    saveUser = async (user) => {
        try {
            const conn = await MysqlSingleton.getInstance()
            return await conn.query(`INSERT INTO users_delivery (autoId, name, email, pass, role, orders) VALUES (?, ?, ?, ?, ?, ?)`, [user.autoId, user.name, user.email, user.pass, user.role, JSON.stringify(user.orders)])
        } catch(err) {
            console.error(err.message);
            return null;
        }
    }
}