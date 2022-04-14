const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Path
        this.usuariosPath = '/api/usuarios';

        //Db connection
        this.dbConnection();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
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