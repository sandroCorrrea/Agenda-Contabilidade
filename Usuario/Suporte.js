const sequelize = require('sequelize');
const database  = require('../database/database');

const Suporte = database.define('suporte_cliente', {
    primeiroNome:{
        type: sequelize.STRING,
        allowNull: false,
    },
    email:{
        type: sequelize.STRING,
        allowNull: false,
    },
    celular:{
        type: sequelize.STRING,
        allowNull: false,
    },
    telefone:{
        type: sequelize.STRING,
        allowNull: false,
    },
    descricao:{
        type: sequelize.TEXT,
        allowNull: false,
    }
});

//Suporte.sync({force: false});

module.exports = Suporte;