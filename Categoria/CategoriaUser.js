const sequelize = require('sequelize');
const connection= require('../database/database');

const Categoria = connection.define('cliente_categoria', {
    nome: {
        type     : sequelize.STRING,
        allowNull: false,
    },
});

Categoria.sync({force: false});

module.exports = Categoria;