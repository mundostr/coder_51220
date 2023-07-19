/**
 * Este es solo un proyecto base de Express, pero generado mediante yarn en lugar de npm.
 * Lo aprovechamos también para mostrar la importación y el uso del paquete de prueba
 * coderhouse-utils publicado en npmjs.com.
 * 
 * Página oficial de Yarn: https://classic.yarnpkg.com/en/
 * 
 * Instalación: npm i -g yarn
 * Inicialización de proyecto: yarn init (yarn init -y)
 * Carga de módulo: yarn add <paquete>
 * Remoción de módulo: yarn remove <paquete>
 * Carga de todas las dependencias: yarn install
 * 
 * Se recomienda no mezclar el uso de yarn y npm en el mismo proyecto
 * 
 * Yarn utiliza la misma estructura que npm (node_modules dentro del proyecto) para almacenar
 * los paquetes, pero tiene su propia gestión de depedencias (ver yarn.lock).
 * 
 */

import express from 'express';
import { __dirname } from 'coderhouse-utils';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({ status: 'OK', data: `Ruta base: ${__dirname}` });
})

try {
    app.listen(3000, () => {
        console.log('Servidor iniciado puerto 3000');
    });
} catch (e) {
    console.log(e.message);
}