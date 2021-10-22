const usuariosCtrl = {};

const passport = require('passport');
const Usuario = require('../models/Usuario');

usuariosCtrl.renderSingUpFrom = (req, res) => {
    res.render('usuarios/signup');
};

usuariosCtrl.singup = async (req, res) => {
    const errors = []
    const { nombre, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden.' });
    }
    if (password.length < 6) {
        errors.push({ text: 'Las contraseñas deben tener al menos 6 caracteres' });
    }

    if (nombre.length == 0) {
        errors.push({ text: 'Ingreas tu nombre' });
    }

    if (email.length == 0) {
        errors.push({ text: 'Ingreas tu email' });
    }

    if (errors.length > 0) {

        res.render('usuarios/signup', {
            errors,
            nombre,
            email,
            password,
            confirm_password,
        });
    } else {
        const emailUsuario = await Usuario.findOne({ email: email });
        if (emailUsuario) {
            req.flash('error_msg', 'El correo ya esta en uso');
            res.redirect('/usuarios/signup');
        } else {

            const nuevoUsuario = new Usuario({ nombre, email, password })
            nuevoUsuario.password = await nuevoUsuario.encryptPassword(password);
            await nuevoUsuario.save();
            req.flash('success_msg', 'Estas registrado...');
            res.redirect('/usuarios/signin');
        }
    }
};


usuariosCtrl.renderSignInForm = (req, res) => { res.render('usuarios/signin'); };


usuariosCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/usuarios/signin',
    successRedirect: '/publicaciones',
    failureFlash: true
});

usuariosCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Sesión Cerrada');
    res.redirect('/usuarios/signin');
};



module.exports = usuariosCtrl;