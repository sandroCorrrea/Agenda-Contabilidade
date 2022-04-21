const mysql = require('mysql');

class QueryDatabase{
    // LOCAL
    conectaBanco(){
        const connectionDatabase = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'scrj123456',
            database: 'agenda'
        });
    
        return connectionDatabase;
    }

    // OFICIAL
    // conectaBanco(){
    //     const connectionDatabase = mysql.createConnection({
    //         host: 'us-cdbr-east-05.cleardb.net',
    //         user: 'bd0bea5221e1a0',
    //         password: '48c0da32',
    //         database: 'heroku_c7c19a27611320c'
    //     });
    
    //     return connectionDatabase;
    // }
}

module.exports = QueryDatabase;