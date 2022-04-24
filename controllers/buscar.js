const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Category, Product, User } = require('../models')

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'usuarios'
    
];

const buscarUsuarios = async(termino, res = response) => {

    const isMongoID = ObjectId.isValid(termino);

    if(isMongoID){
        const user = await User.findById(termino);
        return res.json({
            results: ( user ) ? [ user ] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const users = await User.find({
        $or:[{name : regex},{email : regex}],
        $and: [{state:true}]
    });

    res.json({
        results: users
    })
}

const buscarCategorias = async(termino, res = response) => {

    const isMongoID = ObjectId.isValid(termino);

    if(isMongoID){
        const category = await Category.findById(termino);
        return res.json({
            results: ( category ) ? [ category ] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const category = await Category.find({name : regex , state: true});

    res.json({
        results: category
    })
}

const buscarProductos = async(termino, res = response) => {

    const isMongoID = ObjectId.isValid(termino);

    if(isMongoID){
        const product = await Product.findById(termino).populate('category', 'name');
        return res.json({
            results: ( product ) ? [ product ] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const product = await Product.find({name : regex , state: true}).populate('category', 'name');

    res.json({
        results: product
    })
}

const search = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciónes permitidas son: ${coleccionesPermitidas}.`
        })
    }

    switch (coleccion) {
        case 'categorias':
            buscarCategorias(termino, res);
        break;
        case 'productos':
            buscarProductos(termino, res);
        break;
        case 'usuarios':
            buscarUsuarios(termino, res);
        break;
        default:
            res.status(500).json({
                msg:'Se me olvido hacer esta búsqueda.'
            })
    }

}

module.exports={
    search
}