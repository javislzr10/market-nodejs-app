const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuario = require('../models/Usuario');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    // Comprobamos si existe el usuario
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
        return done(null, false, { message: 'No se ha encontrado el usuario' });
    } else {
        // Comprobamos si existe el contraseña
        const match = await usuario.matchPassword(password);
        if (match) {
            return done(null, usuario);
        } else {

            return done(null, false, { message: 'Contraseña incorrecta' });
        }

    }


}));

passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});

passport.deserializeUser((id, done) => {

    Usuario.findById(id, (err, usuario) => {
        done(err, usuario);
    })

});