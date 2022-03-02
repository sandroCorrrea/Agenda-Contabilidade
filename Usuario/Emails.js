const database = require('../database/database');
const sequelize = require('sequelize');

const Email = database.define('email_interesse', {
    email: {
        type: sequelize.STRING,
        allowNull: false
    }
});

//Email.sync({force: false});

module.exports = Email;