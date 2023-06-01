import passport from 'passport';
import LocalStrategy from 'passport-local';
import userModel from '../api/users/users.model.js';

// Concentramos lo relacionado a Passport en un archivo o directorio de estrategias.
// En este caso tenemos una llamada authRegistration para verificar que el mail a registrar no exista ya en bbdd
// pero lógicamente podríamos ir agregando otras.
// Al importar passport acá y exportarlo por defecto, con solo incluir passport desde este archivo lo tendremos
// disponible para utilizarlo donde sea necesario (ver app.js y main.routes.js)

const verifyAuthRegistration = async (userName, password, done) => {
    try {
        const user = await userModel.findOne({ userName: userName });

        if (user === null) {
            // El mail no está registrado, todo ok para seguir
            return done(null, { _id: 0 });
        } else {
            return done(null, false, { message: 'El email ya se encuentra registrado' });
        }
    } catch(err) {
        return done(err.message);
    }
};

passport.use('authRegistration', new LocalStrategy({ usernameField: 'userName', passwordField: 'password' }, verifyAuthRegistration));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id);
        done(null, user);
    } catch (err) {
        done(err.message);
    }
});

export default passport;