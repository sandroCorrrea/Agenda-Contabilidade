const nodemailer  = require('nodemailer');
const emailAgenda = "agendacontabilidadectga@gmail.com";
const nomeEmpresa = "Agenda Contabilidade <agendacontabilidadectga@gmail.com>";
const ejs         = require('ejs');

class Email{

    constructor(){
        this.remetente    = "";
        this.destinatario = "";
        this.cabecalho    = "";
        this.menssagem    = "";
    }

    InsereEmail(res, modal, rota, emailUser){
        modal.create({
            email: emailUser
        }).then(() =>{
            res.redirect(rota);
        }).catch(erro => {
            console.log(erro);
        });
    }

    EnviaEmailServicosDisponiveis(destinatario){
        // CONFIGURANDO TRANSPORTADOR
        ejs.renderFile('views/usuario/email/enviaEmailClientes.ejs', {name: 'Email'}, function(err, data){
            if (err) {
                console.log(err);
            } else {
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    auth:{
                        user: emailAgenda,
                        pass: "Scrj311001"
                    }
                });
    
                var mainOptions = {
                    from: nomeEmpresa,
                    to: destinatario,
                    subject: 'Olá Tudo Bem ? Seja bem vindo a família Agenda Contabilidade!',
                    html: data
                };
                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Message sent: ' + info.response);
                    }
                });
            }
        });
    }

    EnviaEmailCadastroCliente(destinatario, nome){
        // CONFIGURANDO TRANSPORTADOR
        ejs.renderFile('views/usuario/email/cadastroCliente.ejs', {name: 'Email'}, function(err, data){
            if (err) {
                console.log(err);
            } else {
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    auth:{
                        user: emailAgenda,
                        pass: "Scrj311001"
                    }
                });
    
                var mainOptions = {
                    from: nomeEmpresa,
                    to: destinatario,
                    subject: nome + ' obrigado por realizar seu cadastro!',
                    html: data
                };
                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Message sent: ' + info.response);
                    }
                });
            }
        });
    }

    EnviaEmailSuporte(destinatario, assunto, primeiroNome, pergunta){
        ejs.renderFile('views/usuario/email/enviaEmailSuporte.ejs', {name: 'Email', assunto: assunto, nome: primeiroNome, pergunta: pergunta}, function(err, data){
            if (err) {
                console.log(err);
            } else {
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    auth:{
                        user: emailAgenda,
                        pass: "Scrj311001"
                    }
                });
    
                var mainOptions = {
                    from: nomeEmpresa,
                    to: destinatario,
                    subject: 'Resposta ao Suporte',
                    html: data
                };
                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Message sent: ' + info.response);
                    }
                });
            }
        });
    }

    ConfirmaSuporteEmail(destinatario, nome, assunto, emailRequerente, celular,telefone){
        ejs.renderFile('views/usuario/email/emailAgendaSuporte.ejs', {name: 'Email', nome: nome, assunto: assunto, emailRequerente: emailRequerente, celular: celular, telefone: telefone}, function(err, data){
            if (err) {
                console.log(err);
            } else {
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    auth:{
                        user: emailAgenda,
                        pass: "Scrj311001"
                    }
                });
    
                var mainOptions = {
                    from: nomeEmpresa,
                    to: destinatario,
                    subject: 'Ajuda ao Cliente',
                    html: data
                };
                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Message sent: ' + info.response);
                    }
                });
            }
        });
    }
}

module.exports = Email;