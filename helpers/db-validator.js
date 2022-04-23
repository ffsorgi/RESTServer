const { Category, Product } = require('../models');
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

const existCategoryByID = async(id) => {

    //Find if the id already exists
    const exist  = await Category.findById(id);
    if(!exist){
        throw new Error(`La categoría con ese ID no existe.`);
    }

}

const categoryNameExist = async(name) => {

    const nameUpperCase = name.toUpperCase();
    const exist = await Category.findOne({name : nameUpperCase });
    if(exist){
        throw new Error(`Ya existe una categoría con el nombre ${name}.`);
    }
    
}

const existProductByID = async(id) => {

    //Find if the id already exists
    const exist  = await Product.findById(id);
    if(!exist){
        throw new Error(`El producto con ese ID no existe.`);
    }

}

const productNameExist = async(name) => {

    const nameUpperCase = name.toUpperCase();
    const exist = await Product.findOne({name : nameUpperCase });
    if(exist){
        throw new Error(`Ya existe un producto con el nombre ${name}.`);
    }
    
}


module.exports = {
    isValidRol,
    emailExist,
    existUserByID,
    existCategoryByID,
    categoryNameExist,
    existProductByID,
    productNameExist
}