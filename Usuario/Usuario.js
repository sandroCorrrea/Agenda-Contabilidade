const connection    = require('../database/database');
const sequelize     = require('sequelize');
const CategoriaUser = require('../Categoria/CategoriaUser');
const Admin         = require('../Administrador/Administrador');

const Usuario = connection.define('clientes', {
    nome:{
        type: sequelize.STRING,
        allowNull: false,
    },
    email:{
        type: sequelize.STRING,
        allowNull: false,
    },
    cpf:{
        type: sequelize.STRING,
        allowNull: false,
    },
    cep: {
        type: sequelize.STRING,
        allowNull: false,
    },
    rua:{
        type: sequelize.STRING,
        allowNull: false,
    },
    bairro: {
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
    data_nascimento:{
        type: sequelize.STRING,
        allowNull: false,
    },
    numero_identidade:{
        type: sequelize.STRING,
        allowNull: false,
    },
    orgao_expeditor_identidade:{
        type: sequelize.STRING,
        allowNull: false,
    },
    estado_identidade:{
        type: sequelize.STRING,
        allowNull: false,
    },
    telefone:{
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
    status:{
        type: sequelize.STRING,
        allowNull: false,
    }
});

Usuario.belongsTo(CategoriaUser);

Usuario.belongsTo(Admin);

Usuario.sync({force: false});

module.exports = Usuario;