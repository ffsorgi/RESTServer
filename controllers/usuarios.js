const { response } = require('express');

const usuariosGet = (req, res = response) => {

    const query = req.query;

    res.json({
        msg:'get API - controlador',
        query
    });
}

const usuariosPost = (req, res = response) => {
    const {page = 1, limit = 10} = req.body;
    res.json({
        msg:'post API - controlador',
        page,
        limit
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg:'put API - controlador',
        id
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg:'delete API - controlador'
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg:'path API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut, 
    usuariosDelete, 
    usuariosPatch
}