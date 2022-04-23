const { Router } = require('express');
const { check } = require('express-validator');
const { createProduct, getAllProducts, getProductByID, updateProductByID, deleteProduct } = require('../controllers/productos');
const { existProductByID, productNameExist, existCategoryByID } = require('../helpers/db-validator');
const { isAdmin } = require('../middlewares/validate-rols');

const validateFields = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');

const router =  Router();

/*Route : /api/productos/ */

//Get all products - public
router.get('/', getAllProducts);

//Get one product by id - public
router.get('/:id',[
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(existProductByID),
    validateFields
],getProductByID);

//Create new product  - private whit any role
router.post('/',[
    validateJWT,
    check('name', 'EL nombre es obligatorio.').not().isEmpty(),
    check('name').custom(productNameExist),
    check('category', 'No es un id válido').isMongoId(),
    check('category').custom(existCategoryByID),
    validateFields
], createProduct);

//Update - private whit any role
router.put('/:id',[
    validateJWT,
    //check('category', 'No es un id válido').isMongoId(),
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(existProductByID),
    validateFields
],updateProductByID);

//Delete product - private whit admin role
router.delete('/:id',[
    validateJWT,
    isAdmin,
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(existProductByID),
    validateFields
],deleteProduct);


module.exports = router;