const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/userModel');

const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;

    try {

        const { name, img, email } = await googleVerify(id_token);
        
        let user = await User.findOne({email});

        //If user not exists
        if(!user){
            const data = {
                name,
                email,
                password:':v',
                img,
                role:'USER_ROLE',
                google: true
            };

            user = new User(data);
            await user.save();
        }

        //If user is ban
        if(!user.state){
            return res.status(401).json({
                msg:'Hable con el administrador, usuario baneado.'
            })
        }

        //Generate JWT
        const token = await generateJWT(user.id);

        res.status(200).json({
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            msg:'El token no se pudo verificar.'
        })
    }

}

module.exports = {
    login,
    googleSignIn
}