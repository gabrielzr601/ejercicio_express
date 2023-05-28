const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    genero: String,
    estado: String
          
});

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;