const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const validateJWT = async(req, res = response, next) => {

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            msg:'No hay token en la petición.'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRET_KEY);

        //Read the user that corresponds to the uid
        const user = await User.findById(uid);

        //If user is not found
        if(!user){
            return res.status(401).json({
                msg:'Token no válido.'
            })
        }

        //Verify the user has status on true
        if(!user.state){
            return res.status(401).json({
                msg:'Token no válido.'
            })
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({
            msg:'Token no válido.'
        })
    }

} 

module.exports = {
    validateJWT
}