const { response } = require("express");
const { Category }  = require('../models')

const createCategory = async(req, res = response) => {

    const name = req.body.name.toUpperCase();

    try {

        //Generate data to save
        const data = {
            name,
            user: req.user._id
        }

        const category = new Category(data);
        await category.save();

        res.status(201).json(category);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Error al crear la categoría.'
        })
    }

    
}

//Get categorys - paginate- total - populate
const getAllCategorys = async(req, res = response) => {

    const { limit = 5, from = 0} = req.query;
    const query = {state:true};

    try {
        
        const [total, categorys] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query).populate('user', 'name').skip(Number(from)).limit(Number(limit))
        ])
    
        res.status(200).json({
            total,
            categorys
        })

    } catch (error) {
        res.status(500).json({
            msg:'Error al obtener las categorias.'
        });   
    }

}

//Get category - populate
const getCategoryByID = async(req, res = response) => {

    const { id } = req.params;

    try {

        const category = await Category.findById(id).populate('user', 'name');

        res.status(200).json({
            category
        })
        
    } catch (error) {
        res.status(500).json({
            msg:'Error al obtener la categoria.'
        });
    }

}

//Update category by name
const updateCategoryByID = async(req, res = response) => {

    const { id } = req.params;
    const {state, user, ...data} = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    try {

        await Category.findByIdAndUpdate(id, data);

        res.status(200).json({
            msg:`Se actualizó el nombre correctamente a ${data.name}`
        })
        
    } catch (error) {
        res.status(500).json({
            msg:'Error al actualizar la categoria.'
        });
    }

}

//"Delete" category
const deleteCategory = async(req, res = response) => {

    const { id } = req.params;

    try {

        await Category.findByIdAndUpdate(id, {state:false});

        res.status(200).json({
            msg:'Categoría eliminada correctamente.'
        })
        
    } catch (error) {
        res.status(500).json({
            msg:'Error al borrar la categoría.'
        })
    }

}

module.exports = {
    createCategory,
    getAllCategorys,
    getCategoryByID,
    updateCategoryByID,
    deleteCategory
}