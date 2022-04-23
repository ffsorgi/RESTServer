const { response } = require("express");

const isAdmin = (req, res = response, next) => {

    if(!req.user){
        return res.status(500).json({
            msg:'Se quiere verificar el rol sin el validar token primero.'
        });
    }

    const {role, name } = req.user;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${name} no es administrador.`
        })
    }

    next();
}

const haveRole = (...roles) => {
    return (req, res = response, next) => {

        if(!req.user){
            return res.status(500).json({
                msg:'Se quiere verificar el rol sin el validar token primero.'
            });
        }

        if(!roles.includes(req.user.rol)){
            return res.status(401).json({
                msg:`El servicio requiere uno de estos roles ${ roles }`
            })
        }
        
        next();
    }
}

module.exports = {
    isAdmin,
    haveRole
}