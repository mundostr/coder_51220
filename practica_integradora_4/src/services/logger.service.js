/**
 * Logger basado en Winston
 * Más info en https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/
 * 
 * - npm: 0 error, 1 warn, 2 info, 3 http, 4 verbose, 5 debug, 6 silly
 * - syslog: 0 emergency, 1 alert, 2 critical, 3 error, 3 warning, 5 notice 6 info 7 debug
 */

import dotenv from 'dotenv';
import winston from 'winston';

dotenv.config()

// createLogger() nos permite crear distintos "transportes".
// Un transporte es una vía de registro (por ejemplo hacia consola, archivo, etc)
const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({level: process.env.DEFAULT_LOG_LEVEL || 'info' }), // loguea desde ese nivel hacia ARRIBA
        new winston.transports.File({level: 'warn', filename: './src/logs/errors.log'}),
    ]
})

// Si lo deseamos, podemos habilitar nuestra propia escala de niveles de error con nombres y colores personalizados.
const customLevelOptions = {
    levels: { high: 0, medium: 1, low: 2 },
    colors: { high: 'red', medium: 'yellow', low: 'blue' }
}

// Este ejemplo nos permite ver una opción de aplicación de errores personalizados
const custonLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'low', // logueamos todo, de low hacia arriba
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({ level: 'medium', filename: './src/logs/errors.log' }),
    ]
})

// Generamos un pequeño middleware que inyecta el logger en el objeto request,
// y por supuesto puede también llamar directamente al logger si se lo requiere.
export const loggerService = (req, res, next) => {
    // Aprovechamos una vez más las variables de entorno, para cargar una estrategia
    // de logueo u otra, según estemos en desarrollo o producción
    
    // Uso de niveles standard
    req.logger = logger
    req.logger.log(process.env.DEFAULT_LOG_LEVEL || 'info', `${req.method} ${req.url} ${new Date().toLocaleTimeString()}`)

    // Uso de niveles personalizados
    // req.logger = custonLogger
    // req.logger.low(`${req.method} ${req.url} ${new Date().toLocaleTimeString()}`)
    
    next();
}