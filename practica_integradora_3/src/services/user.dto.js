// Data Transfer Object para normalizar el formato de objeto
// de los datos de usuario, antes de llamar al método que interactúa
// con la base de datos, sea cual fuere el DAO activo.

import { createHash } from '../utils.js'

export default class UserDTO {
    constructor(data) {
        if (!data.user || !data.email) return false;
        
        this.autoId = Date.now() + Math.floor(Math.random() * 10000 + 1);
        this.name = data.user
        this.email = data.email
        this.pass = createHash(data.pass)
        this.role = data.role === 'admin' || data.role === 'user' ? data.role : 'user'
        this.orders = []
    }
}