const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPost ,usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { isValidRol, emailExist, existUserByID } = require('../helpers/db-validator');

const { isAdmin, haveRole } = require('../middlewares/validate-rols');
const validateFields = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');

const router =  Router();

/*Route : /api/usuario/ */

router.get('/', usuariosGet);

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido.').isEmail(),
    check('email').custom(emailExist),
    check('password', 'El password debe de contener al menos 6 caracteres.').isLength({min:6}),
    check('role').custom(isValidRol),
    validateFields
],usuariosPost);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserByID),
    validateFields
], usuariosPut);

router.delete('/:id',[
    validateJWT,
    //isAdmin,
    haveRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserByID),
    validateFields
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;