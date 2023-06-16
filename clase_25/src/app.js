import express from 'express';
import { fork } from 'child_process';
import { __dirname, listNumbers, largeProcess } from './utils.js';
import config from './config.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let visits = 0;

// Un endpoint básico para verificar el funcionamiento de child_process.
// Si el endpoint /suma llama de forma directa a la función largeProcess(), bloquea temporalmente
// al resto de los accesos, en ese caso si intentamos seguir ingresando a / veremos que el
// navegador queda en espera, y recién cuando el cálculo de /suma finaliza, vuelve a responder
app.get('/', (req, res) => {
    try {
        visits++;
        res.status(200).send(`Este es el endpoint principal, visitado ${visits} veces`);
    } catch (err) {
        console.log(err.message);
    }
})

app.get('/suma', (req, res) => {
    // Esta respuesta es bloqueante. largeProcess() toma tiempo y bloquea temporalmente
    // la atención de las demás solicitudes
    // res.status(200).send(`Resultado: ${largeProcess()}`);

    // En esta alternativa, separamos la rutina compleja en otro archivo, y lo pasamos como
    // referencia a fork para crear un proceso hijo (child process).
    const child = fork('src/complex.js');
    // Este mensaje (podría ser start o cualquiera), es el que "espera" el listener en complex.js
    // para comenzar la operación de cálculo.
    child.send('start');
    child.on('message', (result) => {
        // Cuando el proceso hijo (child) termina su cálculo, nos envía mensaje con el resultado
        res.status(200).send(`Resultado: ${result}`);
    });
})

try {
    app.listen(config.SERVER_PORT, () => {
        console.log(`Servidor iniciado en puerto ${config.SERVER_PORT}`);

        // Listeners de process
        process.on('exit', (code) => {
            // Este código se ejecuta luego de una salida del proceso
            switch (code) {
                case -4:
                    console.log('Proceso finalizado por argumentación inválida en una función');
                    break;
                
                default:
                    console.log(`El proceso de servidor finalizó (err: ${code})`);
            }
        });

        process.on('uncaughtException', (exception) => {
            // Este código se ejecuta luego de detectar una excepción no controlada
            console.log(`El proceso de servidor se detuvo por una excepción (${exception})`);
            process.exit(1);
        });

        process.on('message', (message) => {
            // Este código se ejecuta al recibir un mensaje de otro proceso
            console.log(`Se recibió el mensaje: ${message}`);
        });

        // Este timeout solo se utiliza como ejemplo, para forzar un process.exit() o enviar
        // un throw new Error() y de esa forma probar el funcionamiento de los listeners de arriba.
        /* setTimeout(() => {
            // process.exit(0);
            throw new Error('Exception de prueba');
        }, 5000); */

        // Este es el llamado a listNumbers (definida en utils.js) para chequear también el
        // funcionamiento del listener process.on exit.
        // listNumbers(1, 2, 3, 4, 5);
    });
} catch(err) {
    console.log(`No se puede iniciar el servidor (${err.message})`);
}