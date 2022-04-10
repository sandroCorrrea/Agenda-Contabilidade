const database  = require('../database/database');
const sequelize = require('sequelize');
const Pergunta  = require('../Usuario/Suporte');

const RespostaAjuda = database.define('resposta_ajuda_user', {
    email:{
        type: sequelize.STRING,
        allowNull: false
    },
    resposta:{
        type: sequelize.STRING,
        allowNull: false,
    }
});

RespostaAjuda.belongsTo(Pergunta);

RespostaAjuda.sync({force: false});

module.exports = RespostaAjuda;