const { response } = require("express");
const { Product }  = require('../models')

const createProduct = async(req, res = response) => {

    const { state, user, ...body } = req.body;
    const name = req.body.name.toUpperCase();

    try {

        //Generate data to save
        const data = {
            ...body,
            name,
            user: req.user._id
        }

        const product = new Product(data);
        await product.save();

        res.status(201).json(product);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Error al crear el producto.'
        })
    }

    
}

//Get Products - paginate- total - populate
const getAllProducts = async(req, res = response) => {

    const { limit = 5, from = 0} = req.query;
    const query = {state:true};

    try {
        
        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .populate('user', 'name')
                .populate('category', 'name')
                .skip(Number(from))
                .limit(Number(limit))
        ])
    
        res.status(200).json({
            total,
            products
        })

    } catch (error) {
        res.status(500).json({
            msg:'Error al obtener los productos.'
        });   
    }

}

//Get Product - populate
const getProductByID = async(req, res = response) => {

    const { id } = req.params;

    try {

        const product = await Product.findById(id)
            .populate('user', 'name')
            .populate('category', 'name')

        res.status(200).json({
            product
        })
        
    } catch (error) {
        res.status(500).json({
            msg:'Error al obtener el producto.'
        });
    }

}

//Update Product by name
const updateProductByID = async(req, res = response) => {

    const { id } = req.params;
    const {state, user, ...data} = req.body;

    if(data.name){
        data.name = data.name.toUpperCase();
    }
    
    data.user = req.user._id;

    try {

        const product = await Product.findByIdAndUpdate(id, data, { new: true});

        res.status(200).json({
            product
        })
        
    } catch (error) {
        res.status(500).json({
            msg:'Error al actualizar el producto.'
        });
    }

}

//"Delete" Product
const deleteProduct = async(req, res = response) => {

    const { id } = req.params;

    try {

        await Product.findByIdAndUpdate(id, {state:false});

        res.status(200).json({
            msg:'Producto eliminado correctamente.'
        })
        
    } catch (error) {
        res.status(500).json({
            msg:'Error al borrar el producto.'
        })
    }

}

module.exports = {
    createProduct,
    getAllProducts,
    getProductByID,
    updateProductByID,
    deleteProduct
}