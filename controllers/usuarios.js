const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/userModel');

const usuariosGet = async(req, res = response) => {

    const { limit = 5, from = 0} = req.query;
    const query = {state: true};

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(Number(from)).limit(Number(limit))
    ])
                            
    res.json({
        total,
        users 
    });
}

const usuariosPost = async(req, res = response) => {

    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    //Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Save in DB
    await user.save();

    res.json(user);
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    if(password){

        //Encrypt password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json(user);
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, {state:false});
    const authenticatedUser = req.user;

    res.json({
        user
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