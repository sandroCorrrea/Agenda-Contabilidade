const mysql = require('mysql');

class QueryDatabase{
    conectaBanco(){
        const connectionDatabase = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'agenda'
        });
    
        return connectionDatabase;
    }
}

module.exports = QueryDatabase;