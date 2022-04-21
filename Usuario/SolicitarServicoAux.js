const sequelize = require('sequelize');
const database  = require('../database/database');
const Cliente   = require('../Usuario/Usuario');

const solicitaServico = database.define('solicita_servico_auxiliar', {
    assunto:{
        type: sequelize.STRING,
        allowNull: false,
    },
    descricao:{
        type: sequelize.TEXT,
        allowNull: false,
    },
    status:{
        type: sequelize.STRING,
        allowNull: false,
    }
});

solicitaServico.belongsTo(Cliente);

//solicitaServico.sync({force: false});

module.exports = solicitaServico;