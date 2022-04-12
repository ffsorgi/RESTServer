const { Router } = require('express');
const { usuariosGet, usuariosPost ,usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');

const router =  Router();

/*Route : /api/usuario/ */

router.get('/', usuariosGet);

router.post('/', usuariosPost);

router.put('/:id', usuariosPut);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;