const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, getAllCategorys, getCategoryByID, updateCategoryByID, deleteCategory } = require('../controllers/categorias');
const { existCategoryByID, categoryNameExist } = require('../helpers/db-validator');
const { isAdmin } = require('../middlewares/validate-rols');

const validateFields = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');

const router =  Router();

/*Route : /api/categorias/ */

//Get all categories - public
router.get('/', getAllCategorys);

//Get one category by id - public
router.get('/:id',[
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(existCategoryByID),
    validateFields
],getCategoryByID);

//Create new category - private whit any role
router.post('/',[
    validateJWT,
    check('name', 'EL nombre es obligatorio.').not().isEmpty(),
    check('name').custom(categoryNameExist),
    validateFields
], createCategory);

//Update - private whit any role
router.put('/:id',[
    validateJWT,
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(existCategoryByID),
    check('name', 'EL nombre es obligatorio.').not().isEmpty(),
    check('name').custom(categoryNameExist),
    validateFields
],updateCategoryByID);

//Delete category - private whit admin role
router.delete('/:id',[
    validateJWT,
    isAdmin,
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(existCategoryByID),
    validateFields
],deleteCategory);


module.exports = router;