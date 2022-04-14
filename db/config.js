const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        
        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('DB on');

    } catch (error) {
        console.error(error);
        throw new Error('Error al conectarse a la base de datos.');
    }

}

module.exports = {
    dbConnection
};