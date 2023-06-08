import jwt from 'jsonwebtoken';

const PRIVATE_KEY = 'abcdefgh12345678';

const generateToken = (user, expiration) => {
    // sign: payload (contenido), clave de cifrado, tiempo de validez
    return jwt.sign(user, PRIVATE_KEY, { expiresIn: expiration });
}

const authToken = (req, res, next) => {
    // El token llega en el header de autorización
    const authHeader = req.headers.authorization; // req.headers['authorization']

    // Si no hay authorization headers es porque no se envió token, no se puede continuar
    if (!authHeader) return res.status(403).send({ err: 'Se requiere autenticación' });

    // El token llega antecedido de la palabra Bearer, aplicando split separamos por el espacio
    // y tomamos directamente el 2do elemento del array que genera, que es el token.
    const token = authHeader.split(' ')[1];
    jwt.verify(token, PRIVATE_KEY, (err, credentials) => {
        // Si hay error es porque el token no es válido o expiró
        if (err) return res.status(403).send({ err: 'Se requiere autenticación' });

        // Si está todo ok, asignamos los datos de usuario y continuamos
        req.user = credentials.user;
        next();
    });
}

export { generateToken, authToken }