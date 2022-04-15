const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const validateFields = require('../middlewares/validateFields');

const router =  Router();

/*Route : /api/auth/ */

router.post('/login',[
    check('email', 'El correo es obligatorio.').isEmail(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    validateFields
], login);

module.exports = router;