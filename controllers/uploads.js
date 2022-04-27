const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");

const { subirArchivo } = require("../helpers/");
const { User, Product } = require('../models')

const cargarArchivo = async(req, res = response) => {

    try {

        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({nombre});
        
    } catch (msg) {
        res.status(400).json({
            msg
        });
    }

}

const actualizarImagen = async(req, res=response) => {

    const { coleccion, id} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await User.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:'No existe un usuario con ese id.'
                })
            }
            break;
        case 'productos':
            modelo = await Product.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:'No existe un producto con ese id.'
                })
            }
            break;
        default:
            return res.status(500).json({
                msg:'Se me olvidó validar esto.'
            })
    }

    //Limpiar imágenes previas
    try {
        if(modelo.img){
            // Hay que borrar la imagen del servidor
            const pathImagen = path.join(__dirname, '../uploads/', coleccion, modelo.img);
            if(fs.existsSync(pathImagen)){
                fs.unlinkSync(pathImagen);
            }
        }
    } catch (error) {

        return res.status(500).json({msg:'Error al actualizar la imagen'});

    }

    modelo.img = await subirArchivo(req.files, undefined, coleccion); 
    await modelo.save();

    res.json(modelo);

}

const actualizarImagenCloudinary = async(req, res=response) => {

    const { coleccion, id} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await User.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:'No existe un usuario con ese id.'
                })
            }
            break;
        case 'productos':
            modelo = await Product.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:'No existe un producto con ese id.'
                })
            }
            break;
        default:
            return res.status(500).json({
                msg:'Se me olvidó validar esto.'
            })
    }

    //Limpiar imágenes previas
    try {
        if(modelo.img){
            // Hay que borrar la imagen del servidor
            const nombreArr = modelo.img.split('/');
            const nombre = nombreArr[nombreArr.length - 1];
            const [ public_id ] = nombre.split('.');

            cloudinary.uploader.destroy(public_id);
        }
    } catch (error) {

        return res.status(500).json({msg:'Error al actualizar la imagen'});

    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    modelo.img = secure_url;
    await modelo.save();

    res.json(modelo);

}


const mostrarImagen = async(req, res=response) => {

    const { coleccion, id} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await User.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:'No existe un usuario con ese id.'
                })
            }
            break;
        case 'productos':
            modelo = await Product.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:'No existe un producto con ese id.'
                })
            }
            break;
        default:
            return res.status(500).json({
                msg:'Se me olvidó validar esto.'
            })
    }

    //Limpiar imágenes previas
    try {
        if(modelo.img){
            // Hay que borrar la imagen del servidor
            const pathImagen = path.join(__dirname, '../uploads/', coleccion, modelo.img);
            if(fs.existsSync(pathImagen)){
                return res.sendFile(pathImagen);
            }

        }
    } catch (error) {

        return res.status(500).json({msg:'Error al mandar la imagen'});

    }

    const pathPlaceHolder = path.join(__dirname,'../assets/', 'no-image.jpg');
    return res.sendFile(pathPlaceHolder);

}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    actualizarImagenCloudinary,
    mostrarImagen
}