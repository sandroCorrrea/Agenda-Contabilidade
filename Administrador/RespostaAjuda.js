const database      = require('../database/database');
const sequelize     = require('sequelize');
const Pergunta      = require('../Usuario/Suporte');
const Administrador = require('../Administrador/Administrador');

const RespostaAjuda = database.define('resposta_ajuda_user', {
    email:{
        type: sequelize.STRING,
        allowNull: true
    },
    resposta:{
        type: sequelize.STRING,
        allowNull: true,
    }
});

RespostaAjuda.belongsTo(Pergunta);
RespostaAjuda.belongsTo(Administrador);

//RespostaAjuda.sync({force: true});

module.exports = RespostaAjuda;