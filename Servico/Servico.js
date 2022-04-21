const sequelize        = require('sequelize');
const connection       = require('../database/database');
const Categoria        = require('../Categoria/Categoria');
const ClienteCategoria = require('../Categoria/CategoriaUser');

const Servico = connection.define('servico', {
    nome:{
        type: sequelize.STRING,
        allowNull: false,
    },
    abreviatura:{
        type: sequelize.STRING,
        allowNull: false,
    },
    apelido:{
        type: sequelize.STRING,
        allowNull: false,
    },
});

Servico.belongsTo(Categoria);
Servico.belongsTo(ClienteCategoria);
Servico.sync({force: false});

module.exports = Servico;