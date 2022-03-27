const mysql = require('mysql');
class Suporte{

    constructor(){
        this.email            = "";
        this.nome_requerente  = "";
        this.assunto          = "";
        this.celular          = "";
        this.telefone         = "";
    }

    CadastraSuporte(modal, res, nome, email, telefone, celular, assuntoSuporte, rotaResposta){
    
        this.nome_requerente = nome;
        this.email           = email;
        this.celular         = celular; 
        this.telefone        = telefone;
        this.assunto         = assuntoSuporte;

        modal.create({
            primeiroNome: this.nome_requerente,
            email       : this.email,
            celular     : this.celular,
            telefone    : this.telefone,
            descricao   : this.assunto,
        }).then(() => {
            res.redirect(rotaResposta);
        }).catch(erro => {
            console.log(erro);
        });
    }

    CadastraRespostaSuporte(modal, res, rota, idPerguntaSuporte, emailUser, respostaUser){
        modal.create({
            email            : emailUser,
            resposta         : respostaUser,
            suporteClienteId : idPerguntaSuporte
        }).then(() => {
            res.redirect(rota);
        }).catch(erro => {
            console.log(erro);
        });
    }

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

module.exports = Suporte;