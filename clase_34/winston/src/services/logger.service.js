import dotenv from 'dotenv';
import winston from 'winston';

dotenv.config()
console.log(process.env.MODE)

// Si lo deseamos, podemos habilitar nuestra propia escala de niveles de error,
// con nombres y colores personalizados.
const customLevelOptions = {
    levels: {
        high: 0,
        medium: 1,
        low: 2
    },
    colors: {
        high: 'red',
        medium: 'yellow',
        low: 'blue'
    }
}

// createLogger() nos permite crear distintos "transportes".
// Un transporte es una vía de registro (por ejemplo hacia consola, archivo, etc)
const logger = winston.createLogger({
    transports: [
        // Al iniciar un transporte, indicamos desde qué nivel de error hacia arriba
        // (en importancia) deseamos loguear.
        new winston.transports.Console({level: 'http'}),
        new winston.transports.File({level: 'warn', filename: './src/logs/errors.log'}),
    ]
})

const devLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            // Este ejemplo nos permite ver una opción de aplicación de errores personalizados
            level: 'low',
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOptions.colors}),
                winston.format.simple()
            )
        }),
    ]
})

const prodLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({level: 'http'}),
        new winston.transports.File({level: 'warn', filename: './src/logs/prod_errors.log'}),
    ]
})

// Generamos un pequeño middleware que inyecta el logger en el objeto request,
// y por supuesto puede también llamar directamente al logger si se lo requiere.
export const addLogger = (req, res, next) => {
    // Aprovechamos una vez más las variables de entorno, para cargar una estrategia
    // de logueo u otra, según estemos en desarrollo o producción
    req.logger = process.env.MODE === 'DEVEL' ? devLogger : prodLogger
    req.logger.high(`${req.method} ${req.url} ${new Date().toLocaleTimeString()}`)
    next();
}