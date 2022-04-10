const { Sequelize } = require('sequelize');
/* ----------------------------- CONEXÃO COM O BANCO DE DADOS LOCAL */
const connection = new Sequelize('agenda', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00',
});
/* ----------------------------- FIM DA CONEXÃO COM O BANCO DE DADOS LOCAL */

module.exports = connection;