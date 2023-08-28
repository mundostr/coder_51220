import passport from 'passport';
import LocalStrategy from 'passport-local';
import userModel from '../models/user.dbmodel.js';
import { isValidPassword } from '../utils.js'


// Método de verificación, la función que realiza específicamente el chequeo
// de los datos de usuario y devuelve la respuesta mediante done()
const verifyLogin = async (userName, password, done) => {
    try {
        const user = await userModel.findOne({ email: userName });
        if (user === null) return done(null, false);
        if (isValidPassword(user.pass, password)) return done(null, user);
        return done(null, false);
    } catch(err) {
      return done(err.message);
    }
};

// Aquí habilitamos una nueva estrategia passport de tipo local (LocalStrategy)
// indicando el nombre de los dos campos que se usarán para autenticar y pasando
// la referencia a la función que hará la revisión (verifyLogin)
passport.use('login', new LocalStrategy({ usernameField: 'email', passwordField: 'pass' }, verifyLogin));

passport.serializeUser((user, done) => done(null, user.id) );

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err.message);
  }
});

export default passport;