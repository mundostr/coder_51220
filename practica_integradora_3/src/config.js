import dotenv from 'dotenv';
import { Command } from 'commander';

// Aprovechamos dotenv y commander para configurar el modo (DEVELOPMENT o PRODUCTION)
// desde una variable de línea de comandos, y cargar el archivo de variables de entorno correspondiente

const program = new Command();
program
    .option('-m --mode <mode>', 'Execution mode (PRODUCTION / DEVELOPMENT)')
    .parse(process.argv);
const cl_options = program.opts();

dotenv.config({ path: cl_options.mode == 'DEVEL' ? './.env.development': './.env.production' });

const cors_origins = process.env.ALLOWED_ORIGINS;
const config = {
    SERVER_PORT: process.env.SERVER_PORT,
    MONGOOSE_URL: process.env.MONGOOSE_URL,
    MYSQL_URL: process.env.MYSQL_URL,
    MYSQL_DB: process.env.MYSQL_DB,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASS: process.env.MYSQL_PASS,
    SECRET: process.env.SECRET,
    ALLOWED_ORIGINS: cors_origins.includes(',') ? cors_origins.split(',').map(item => item.trim()) : cors_origins
}

export default config;