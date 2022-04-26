const validateFields = require('./validateFields');
const validateJWT = require('./validateJWT');
const validateRols = require('./validate-rols');
const validateFile = require('./validate-file');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRols,
    ...validateFile
}