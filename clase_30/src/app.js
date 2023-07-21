/**
 * Envío de notificaciones vía mail o SMS
 * En este caso utilizamos como ejemplo la configuración de un servidor SMTP de Gmail, pero lógicamente
 * el módulo nodemailer puede funcionar con cualquier otro.
 * 
 * Para el caso de las notificaciones SMS, empleamos el servicio de Twilio, chequear los slides para recordar
 * los pasos de activación de la cuenta. Recordar que el servicio no es gratuito, solo tiene un período de
 * prueba con crédito para testear, si se desea seguir usándolo, se deberá cargar crédito luego
 */

import * as url from 'url';
import express from 'express';
import twilio from 'twilio';
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';


const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Notificaciones vía email
// Paso 1: generar un transporte (conexión autenticada al SMTP que corresponde)
const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'usuario@email.com',
        pass: 'clave'
    }
})


// Paso 2: al solicitar el endpoint GET /mail, se envía al SMTP para despacho
app.get('/mail', async (req, res) => {
    const result = await transport.sendMail({
        from: 'Carlos Perren <caperrenpro@gmail.com>',
        to: 'idux.net@gmail.com',
        subject: 'Coder prueba 07',
        html: `
            <h1><b>Coder prueba 07</b></h1>
            <p style="color: #f00;">
                <b>CoderHouse</b><br>
                <img src="cid:logo_coder" style="width: 100%;" />
            </p>
        `,
        attachments: [
            { filename: 'logo_coder.png', path: `${__dirname}/static/logo_coder.png`, cid: 'logo_coder' },
            { filename: 'sample.png', path: `${__dirname}/static/sample.pdf`, cid: 'sample' }
        ]
    })

    res.status(200).send({ status: 'OK', result: result });
})


// Notificaciones vía SMS
// Paso 1: inicializar cliente Twilio con SID y TOKEN
// const client = twilio('SID_VALIDO', 'TOKEN_VALIDO') // generados al dar de alta cuenta

// Paso 2: al solicitar el endpoint GET /sms, se envía a Twilio un mensaje para su reenvío como SMS
app.get('/sms', async (req, res) => {
    // Simplemente como recordatorio práctico, se toma nombre y producto desde la URL de la solicitud
    // Ejemplo: http://localhost:3000/sms?nombre=Carlos&producto=Alfajor
    const nombre = req.query.nombre;
    const producto = req.query.producto;

    /* const result = await client.messages.create({
        body: `Gracias ${nombre}, tu solicitud del producto ${producto} ha sido aprobada`,
        from: 'nro_de_origen_en_formato_valido',
        to: 'nro_de_destino_en_formato_valido'
    }) */
    const result = {}

    res.status(200).send({ status: 'OK', result: result });
})


// Variante con TELEGRAM
const TELEGRAM_API = 'https://api.telegram.org';
// Este token se obtiene al generar un nuevo bot desde @BotFather en Telegram
const BOT_TOKEN = 'COLOCAR_TOKEN';
// El chat ID identifica al usuario o grupo al cual el bot envía
// Para conocer el id de un grupo, agregar primero al bot, y luego visitar
// https://api.telegram.org/botBOT_TOKEN/getUpdates
// debe figurar la palabra bot y BOT_TOKEN reemplazarse por el token indicado por @BotFather
// al generar el bot (de corrido, sin espacios entre bot y el token)
// Para conocer el ID de un usuario, el usuario puede buscar el bot @userinfobot y
// enviarle un mensaje /start (iniciar).
const CHAT_ID = 'ID_DEL_CHAT_AL_CUAL_ENVIAR';

app.get('/telegram', async (req, res) => {
    if (req.query.message == null) req.query.message = 'Mensaje de prueba';

    const url = `${TELEGRAM_API}/bot${BOT_TOKEN}/sendMessage`;
    const data = { chat_id: CHAT_ID, text: req.query.message };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        res.status(200).send({ status: 'OK', result: result });
    } catch (err) {
        res.status(500).send({ status: 'ERR', result: err.message });
    }
})


try {
    app.listen(3000, () => {
        console.log(`Servidor iniciado en puerto 3000`);
    });
} catch (err) {
    console.log(`No se puede iniciar el servidor (${err.message})`);
}