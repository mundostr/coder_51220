/*
Segundo ejemplo de servidor HTTP con ExpressJS
*/

const fs = require('fs');
const express = require('express');

const PUERTO = 8080;
// Renombramos el archivo a extensión .dat para evitar el problema de loop en nodemon,
// por supuesto el contenido puede igualmente parsearse como JSON y operarse sin problemas.
const ARCHIVO_USUARIOS = './usuarios.dat';

// Mantenemos siempre esta configuración para una lectura correcta de datos complejos desde la URL
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Solicitud get asíncrona con retorno de objeto JSON y código de estado
server.get('/usuario/:id', async (req, res) => {
    try {
        const usuarios = await fs.promises.readFile(ARCHIVO_USUARIOS, 'utf-8');
        const usuariosJson = await JSON.parse(usuarios);
        const usuario = usuariosJson.find(usuario => usuario.id === parseInt(req.params.id));
        if (usuario) {
            res.status(200).send(usuario);
        } else {
            res.status(200).send({ mensaje: 'ERROR: no se encuentra el id' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});

server.post('/usuario', async (req, res) =>{
    /*
        Así como los objetos req.params y req.query nos permiten acceder a parámetros enviados por URL,
        req.body nos permite acceder al cuerpo de contenido enviado en la petición, pero necesitamos
        lo que se llama un body parser para poder obtener correctamente ese contenido. Express cuenta
        desde hace tiempo con su propio body parser para JSON, que es el que rehabilitamos más arriba
        (línea 13) server.use(express.json());
        A partir de ahora podremos acceder sin problemas a ese contenido.

        Como prueba en el send respondemos con un objeto que contiene un mensaje y una copia del body
        recibido (req.body). Por supuesto, tendríamos ya disponible ese objeto req.body para operar.

        Agregar acá como práctica el llamado al método para verificar que se han recibido los campos
        necesarios y agregar el nuevo usuario al archivo.
    */
    res.status(200).send({ mensaje: 'Body recibido desde la solicitud POST', body: req.body });
})

server.listen(PUERTO, () => {
    console.log(`Servidor Express activo en puerto ${PUERTO}`);
});
