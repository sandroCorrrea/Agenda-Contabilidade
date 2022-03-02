const jwt = require('jsonwebtoken');

const JWTtoken = "jdiosfjsajpokdjpoajidhofdhsiohpodshaopjpkjoejgoihwuigefiuhfiehwfihei";

var userToken = (req, res, next) =>{
    const userTokenAuth = req.headers['authorization'];

    if(userTokenAuth != undefined){
        var bearer = userTokenAuth.split(" ");
        var token = bearer[1];
        
        jwt.verify(token, JWTtoken, (err, data) => {
            if(err){
                res.json('Deu erro aqui 1');
            }else{
                req.dados = data;
                next(); 
            }
        });
    }else{
        res.json('Deu erro aqui 2');
    }
};

module.exports = userToken;