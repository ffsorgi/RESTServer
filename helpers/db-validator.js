const Role = require('../models/roleModel');
const User = require('../models/userModel');

const isValidRol = async(role = '') => {
    
    const exist = await Role.findOne({role});
    if(!exist){
        throw new Error(`El rol ${role} no esta registrado en la DB`);
    }
}

const emailExist = async(email) => {

    //Find if the email already exists
    const exist  = await User.findOne({email});
    if(exist){
        throw new Error(`Ya existe un usuario con ese email.`);
    }

}

const existUserByID = async(id) => {

    //Find if the id already exists
    const exist  = await User.findById(id);
    if(!exist){
        throw new Error(`El id no existe.`);
    }

}

module.exports = {
    isValidRol,
    emailExist,
    existUserByID
}