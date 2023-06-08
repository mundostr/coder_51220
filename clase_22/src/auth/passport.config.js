import passport from 'passport';
import jwt from 'passport-jwt';

// Estrategia JWT
const JWTStrategy = jwt.Strategy;
const JWTExtractor = jwt.ExtractJwt;

const cookieExtractor = (req) => {
    if (req && req.cookies) { // hay cookies
        return req.cookies['coder_login_token'];
    }

    return null;
}

const jwtData = {
    // El token se recupera desde las cookies
    jwtFromRequest: JWTExtractor.fromExtractors([cookieExtractor]),
    secretOrKey: 'abcdefgh12345678' // misma que en app.js
}

const verify = async (jwt_payload, done) => {
    try {
        return done(null, jwt_payload);
    } catch(err) {
        return done(err.message);
    }
};

const initPassport = () => {
    passport.use('jwtAuth', new JWTStrategy(jwtData, verify));
}

// Middleware de autenticación detallada
// En lugar de llamar directamente a passport.authenticate en el endpoint, llamamos a este
const authentication = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() });
            }
            req.user = user;
            next();
        })(req, res, next);
    }
}

// Middleware de autorización
const authorization = (role) => {
    return async(req, res, next) => {
        if (!req.user) return res.status(401).send({ error: 'Unauthorized' });
        if (req.user.role != 'admin' && req.user.role != role) return res.status(403).send({ error: 'No permissions' });
        next();
    }
}

export { initPassport, authentication, authorization };