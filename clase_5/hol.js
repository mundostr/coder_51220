const fs = require('fs');
const crypto = require('crypto');

class UserManager{
    constructor(archivoJson) {
        this.archivoJson = archivoJson;
        this.usuarios = [];
    }

    crearUsuario = async (objUsuario) => {
        objUsuario.clave = crypto.createHash('sha256').update(objUsuario.clave).digest('hex');
        this.usuarios.push(objUsuario);
        await fs.promises.writeFile(this.archivoJson, JSON.stringify(this.usuarios));
        console.log('Usuarios actualizados a disco');
    }

    validarUsuario = async (usuario, clave) => {
        const listaUsuarios = await fs.promises.readFile(this.archivoJson, 'utf-8');
        const listaUsuariosJson = JSON.parse(listaUsuarios);
        
        const existeUsuario = listaUsuariosJson.find(item => item.usuario === usuario);
        if (existeUsuario) {
            const claveEncriptada = crypto.createHash('sha256').update(clave).digest('hex');
            const coincidencia = listaUsuariosJson.find(item => item.clave === claveEncriptada);

            if (coincidencia) {
                console.log('Usuario logueado!');
            } else {
                console.log('Clave incorrecta');
            }
        } else {
            console.log('No existe el usuario');
        }
    }
}


const manager = new UserManager('./usuarios.json');
manager.crearUsuario({ nombre: 'Carlos', apellido: 'Perren', usuario: 'cperren', clave: 'abc123' });
manager.validarUsuario('cperren', 'abc123');
