const { Router } = require('express');
const { search } = require('../controllers/buscar');

const router = Router();

/*Route : /api/buscar/ */

router.get('/:coleccion/:termino', search)


module.exports = router;