import * as url from 'url';
import bcrypt from 'bcrypt';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const createHash = (pass) => {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
}

const isValidPassword = (passInDb, passToCompare) => {
    return bcrypt.compareSync(passToCompare, passInDb);
}

export { __filename, __dirname, createHash, isValidPassword };