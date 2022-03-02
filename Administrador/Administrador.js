const sequelize  = require('sequelize');
const connection = require('../database/database');

const Administrador = connection.define('administradores', {    
    nome:{
        type: sequelize.STRING,
        allowNull: false,
    },
    sobrenome:{
        type: sequelize.STRING,
        allowNull: false,
    },
    cpf:{
        type: sequelize.STRING,
        allowNull: false,
    },
    rg:{
        type: sequelize.STRING,
        allowNull: false,
    },
    cep:{
        type: sequelize.STRING,
        allowNull: false,
    },
    rua:{
        type: sequelize.STRING,
        allowNull: false,
    },
    bairro:{
        type: sequelize.STRING,
        allowNull: false,
    },
    cidade:{
        type: sequelize.STRING,
        allowNull: false,
    },
    estado:{
        type: sequelize.STRING,
        allowNull: false,
    },
    dataNascimento:{
        type: sequelize.DATEONLY,
        allowNull: false,
    },
    email:{
        type: sequelize.STRING,
        allowNull: false,
    },
    tipoUsuario:{
        type: sequelize.STRING,
        allowNull: false, 
    },
    celular:{
        type: sequelize.STRING,
        allowNull: false,
    },
    senha:{
        type: sequelize.STRING,
        allowNull: false,
    },
    foto:{
        type: sequelize.STRING(120),
        allowNull: false,
    }
});

//Administrador.sync({force: true});

module.exports = Administrador;