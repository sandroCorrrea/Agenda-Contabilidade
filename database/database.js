const { Sequelize } = require('sequelize');
/* ----------------------------- CONEXÃO COM O BANCO DE DADOS LOCAL */
// const connection = new Sequelize('agenda', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//     timezone: '-03:00',
// });
/* ----------------------------- FIM DA CONEXÃO COM O BANCO DE DADOS LOCAL */

/* ----------------------------- CONEXÃO COM O BANCO DE DADOS OFICIAL */
const connection = new Sequelize('heroku_c7c19a27611320c', 'bd0bea5221e1a0', '48c0da32', {
    host: 'us-cdbr-east-05.cleardb.net',
    dialect: 'mysql',
    timezone: '-03:00',
});
/* ----------------------------- FIM DA CONEXÃO COM O BANCO DE DADOS LOCAL */

module.exports = connection;