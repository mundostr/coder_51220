/*
Ejercicio comparativo de los 4 métodos base (GET, POST, PUT DELETE)
*/

const express = require('express');

const PUERTO = 8080;

let frase = 'Frase inicial';


// Server Express
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Endpoint GET 1
server.get('/api/frase', (req, res) => {
    const obj = { frase: frase };
    res.status(200).send(obj);
});

// Endpoint GET 2 (utilizamos un parámetro req.params llamado pos)
server.get('/api/palabras/:pos', (req, res) => {
    try {
        if (req.params.pos === undefined || req.params.pos < 1) {
            res.status(200).send({ error: 'Indicador de posición no válido: /api/palabras/posicion' });
        } else {
            const palabras = frase.split(" ");
            const obj = { buscada: palabras[req.params.pos - 1] };
            res.status(200).send(obj);
        }
    } catch(err) {
        res.status(500).send({ error: err });
    }
});

// Endpoint POST (utilizamos el req.body para recuperar el cuerpo enviado en la solicitud)
server.post('/api/palabras', (req, res) => {    
    // Verificamos que contenga la key palabra
    if (req.body.hasOwnProperty('palabra') && req.body.palabra !== "") {
        frase = `${frase} ${req.body.palabra}`;
        const palabras = frase.split(" ");
        const obj = { agregada: req.body.palabra, pos: palabras.length, frase: frase };
        res.status(200).send(obj);
    } else {
        res.status(200).send({ error: 'El body debe contener el key _palabra_ con el valor a agregar' });
    }
});

// Endpoint PUT (utilizamos nuevamente el req.body y el req.params)
server.put('/api/palabras/:pos', (req, res) => {
    // Verificamos que contenga la key palabra y el parámetro pos
    if (req.body.hasOwnProperty('palabra') && req.body.palabra !== "" && req.params.pos !== undefined && req.params.pos > 0) {
        const palabras = frase.split(" ");

        if (req.params.pos <= palabras.length) {
            const palabraAnterior = palabras[req.params.pos - 1];
            palabras[req.params.pos - 1] = req.body.palabra;
            frase = palabras.join(" ");

            const obj = { actualizada: req.body.palabra, anterior: palabraAnterior, frase: frase };
            res.status(200).send(obj);
        } else {
            res.status(200).send({ error: 'El parámetro de posición es mayor a la cantidad de palabras', frase: frase });
        }
    } else {
        res.status(200).send({ error: 'El body debe contener el key _palabra_ con el valor a modificar y la url el parámetro de posición' });
    }
});

// Endpoint DELETE (utilizamos nuevamente el req.params)
server.delete('/api/palabras/:pos', (req, res) => {
    if (req.params.pos !== undefined && req.params.pos > 0) {
        const palabras = frase.split(" ");

        if (req.params.pos <= palabras.length) {
            // Eliminamos un elemento iniciando desde pos. 
            // Recordar que siempre restamos 1 porque el índice de la matriz comienza en 0.
            const palabraBorrada = palabras[req.params.pos - 1];
            palabras.splice(req.params.pos - 1, 1);
            frase = palabras.join(" ");

            const obj = { borrada: palabraBorrada, frase: frase };
            res.status(200).send(obj);
        } else {
            res.status(200).send({ error: 'El parámetro de posición es mayor a la cantidad de palabras', frase: frase });
        }
    } else {
        res.status(200).send({ error: 'El parámetro de posición no puede ser 0 o negativo' });
    }
});


server.listen(PUERTO, () => {
    console.log(`Servidor Express activo en puerto ${PUERTO}`);
});
