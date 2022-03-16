const sequelize  = require('sequelize');
const connection = require('../database/database');

const Postagem = connection.define('postagens', {
    titulo:{
        type: sequelize.STRING,
        allowNull: false,
    },
    dataInicio:{
        type: sequelize.STRING,
        defaultValue: null,
    },
    dataFim: {
        type: sequelize.STRING,
        defaultValue: null,
    },
    corpoPostagem:{
        type: sequelize.TEXT,
        allowNull: false,
    }
});

//Postagem.sync({force: false});

module.exports = Postagem;