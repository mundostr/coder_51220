import passport from 'passport';
import jwt from 'passport-jwt';
import local from 'passport-local';
import Users from '../api/users/users.dbclass.js';
import { createHash, isValidPassword } from "../utils.js";

// Creamos un handler para estrategia de tipo local, y otro para tipo JWT
// junto con su extractor, recordar que en este caso passport necesita una función
// auxiliar que se encargue de tomar el token desde una cookie y pasarlo (cookieExtractor debajo)
const LocalStrategy = local.Strategy;
const JwtStrategy = jwt.Strategy;
const JWTExtractor = jwt.ExtractJwt;
const userService = new Users();

const cookieExtractor = (req) => {
    if (req && req.cookies) { return req.cookies['coderCookie']; } // hay cookies
    return null;
}

// Configuramos 3 estrategias: 2 de tipo local (register y login), más una de tipo JWT (current)
const initializePassport = async() => {
    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'userName', passwordField: 'password', session: false }, async(userName, password, done) => {
        try {
            // const {firstName, lastName, userName, password, gender} = req.body;
            // if(!firstName || !lastName || !userName || !password || !gender) return done(null, false, { message: 'Se requiere firstName, lastName, userName, password y gender' });
            
            const exists = await userService.getUserBy({ userName: userName });
            if(exists) return done(null, false, { message: 'El usuario ya se encuentra registrado' });
            
            const newUser = {
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                password: createHash(password),
                gender: gender
            }

            let result = await userService.addUser(newUser);
            return done(null, result);
        } catch(err) {
            return done(err.message);
        }
    }))

    passport.use('login', new LocalStrategy({ usernameField: 'userName', passwordField: 'password', session: false }, async(userName, password, done) => {
        try {
            const user = await userService.getUserBy({ userName: userName });
            if(!user) return done(null, false, { messages: 'No se encuentra el usuario' });
            const passwordValidation = isValidPassword(user.password, password);
            if(!passwordValidation) return done(null, false, { messages: 'Clave incorrecta' });
            return done(null, user);
        } catch(err) {
            return done(err.message);
        }
    }));

    passport.use('current', new JwtStrategy({ jwtFromRequest: JWTExtractor.fromExtractors([cookieExtractor]), secretOrKey: 'abcdefgh12345678'}, async(jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch(err) {
            return done(err.message);
        }
    }));

    passport.serializeUser((user, done)=> {
        done(null, user._id);
    });

    passport.deserializeUser(async(id, done) => {
        const result = await userService.findOne({ _id: id })
        return done(null, result);
    });
}

export default initializePassport;