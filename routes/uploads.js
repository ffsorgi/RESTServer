const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validateFile } = require('../middlewares');

const validateFields = require('../middlewares/validateFields');

const router =  Router();

/*Route : /api/uploads/ */

router.post('/',[
    validateFile,
    validateFields
], cargarArchivo);

router.put('/:coleccion/:id',[
    validateFile,
    check('id','El ID debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios','productos'])),
    validateFields
], actualizarImagenCloudinary);

router.get('/:coleccion/:id',[
    check('id','El ID debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios','productos'])),
    validateFields
], mostrarImagen);

module.exports = router;