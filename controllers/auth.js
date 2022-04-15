const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/userModel');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async(req, res = response) => {

    const {email, password} = req.body;

    try {

        //Find if the email already exists
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                msg:'Usuario/Contraseña no son válidos.'
            });
        }
 
        //Check status !== false
        if(!user.state) {
            return res.status(400).json({
                msg:'Cuenta baneada hable con un administrador.'
            });
        }

        //Verify password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(validPassword) {
            return res.status(400).json({
                msg:'Usuario/Contraseña no son válidos.'
            });
        }

        //Generate JWT
        const token = await generateJWT(user.id);

        res.status(200).json({
            user,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Error al iniciar sesión, hable con un administrador.'
        })
    }
}

module.exports = {
    login
}