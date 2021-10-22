const { Router } = require ('express');
const router = Router();

const { renderSingUpFrom, singup, renderSignInForm, signin, logout } = require ('../controllers/usuarios.controller')

router.get('/usuarios/signup', renderSingUpFrom);

router.post('/usuarios/signup', singup);

router.get('/usuarios/signin', renderSignInForm);

router.post('/usuarios/signin', signin);

router.get('/usuarios/logout', logout);

module.exports = router;