/**
 * Distintas pruebas con Artillery
 * https://www.npmjs.com/package/artillery
 */

import express from 'express';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import sessionsRouter from './routes/sessions.router.js';

// Aprovechamos este ejemplo de Artillery para mostrar cómo crear instancias
// de la App mediante cluster.
import cluster from 'cluster';
import { cpus } from 'os';

// Si es la instancia primaria, verifica la cantidad de cores de procesador disponibles,
// y en base a eso ejecuta un ciclo generando workers (procesos secundarios con cluster.fork())
if (cluster.isPrimary) {
    for (let i = 0; i < cpus().length; i++) cluster.fork();

    // Además de generar los workers, activa un listener que queda atento al evento exit de
    // cualquiera de ellos. De esta forma, si un worker se "cae" por determinada razón,
    // inmediatamente el sistema activa otro de reemplazo mediante cluster.fork()
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Se cerró el WORKER ${worker.process.pid}`);
        cluster.fork();
    });
} else {
    // El código base de la app se encierra en este else, de tal manera que pueda ser ejecutado
    // por cada instancia de worker

    const app = express();
    const PORT = process.env.PORT || 3000;
    // Conectar a una bbdd remota para testear
    // const connection = mongoose.connect(`COLOCAR_URL_MONGO_ATLAS`)
    
    app.use(express.json());
    
    app.use('/api/sessions', sessionsRouter);
    
    // Endpoing prueba 1
    // comando: artillery quick --count 40 --num 50 "http://localhost:3000/simple" -o simple.json
    
    // Simula accesos de 40 usuarios diferentes, 50 solicitudes cada uno (2000 en total) y guarda
    // el resultado de la prueba en simple.json
    app.get('/simple', async(req, res) => {
        let sum = 0;
        for (let i = 0; i < 100000; i++) sum += i
        res.status(200).send({sum})
    })
    
    // Endpoing prueba 2
    // comando: artillery quick --count 40 --num 50 "http://localhost:3000/complex" -o complex.json
    
    // Ejecutamos el mismo comando pero en este caso el proceso del endpoint tardará mucho más.
    // Comparar los resultados, ver secciones "counters" y "http.response_time" y determinar cuántas
    // solicitudes fueron exitosas, cuántas fallidas, timeouts y tiempos de respuesta.
    // Vemos que si bien el proceso funciona en una prueba manual aislada (aunque tarde), genera
    // grandes problemas al aumentar la carga de solicitudes.
    app.get('/complex', async(req, res) => {
        let sum = 0;
        for (let i = 0; i < 5e8; i++) sum += i
        res.status(200).send({sum})
    })
    
    // Endpoint prueba 3
    // comando: artillery run config.yml -o complete_test.json
    // comando 2 (reporte): artillery report complete_test.json -o complete_test.html
    
    // Aprovechamos faker para generar datos de usuario random, con los cuales artillery podrá probar
    // Artillery probará además los endpoints /api/sessions/register y /api/sessions/login, intentando
    // cargar 200 nuevos usuarios en la base de datos, a una tasa de 10 solicitudes por segundo durante
    // 20 segundos.
    // En este caso la configuración es más compleja, ya que hay varios endpoints involucrados y otros
    // detalles, por lo cual utilizamos un archivo de seteo (ver config.yml)
    app.get('/api/test/user',(req,res)=>{
        let first_name = faker.name.firstName();
        let last_name = faker.name.lastName();
        let email = faker.internet.email();
        let password =  faker.internet.password();
        res.send({first_name,last_name,email,password})
    })
    
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT} (PID ${process.pid})`))
}
