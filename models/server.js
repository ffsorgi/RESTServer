const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Path
        this.paths = {
            auth:'/api/auth',
            buscar:'/api/buscar',
            categorias:'/api/categorias',
            productos:'/api/productos',
            usuarios:'/api/usuarios'
            
            
            
        }

        //Db connection
        this.dbConnection();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        
        
    }

    async dbConnection(){
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //Reading and parsing body
        this.app.use(express.json());

        //Public directory
        this.app.use(express.static('public'));
    }

    listener(){
        this.app.listen(this.port, () => {
            console.clear();
            console.log(`Corriendo en el puerto ${this.port}`);
        })
    }

}

module.exports = Server;