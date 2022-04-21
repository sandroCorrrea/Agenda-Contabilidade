const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const Admin = require('./Administrador');
const AdminAgenda = require('../src/Administrador');
const Agenda = require('../src/Agenda');
const Cliente = require('../Usuario/Usuario');
const UserCliente = require('../src/Cliente');
const Suporte = require('../Usuario/Suporte');
const RespSuporte = require('./RespostaAjuda');
const SuporteClass = require('../src/Suporte');
const EmailSuporte = require('../src/Email');
const authAdmin = require('../middlewares/adminAuth');
const QueryDatabase = require('../database/query');
// INSTÂNCIAS USADAS
var administrador = new AdminAgenda();
var agenda = new Agenda();
var usuario = new UserCliente();
var suporte = new SuporteClass();
var email = new EmailSuporte();
var querySql = new QueryDatabase();

router.get('/admin/new', authAdmin, (req, res) => {

    var cpfError   = req.flash("cpfError");
    var emailError = req.flash("emailError");

    cpfError   = (cpfError == undefined || cpfError.length == 0) ? undefined : cpfError = cpfError;
    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError = emailError;

    res.render('administrador/admin/new', {
        nomeAdministrador: req.session.admins.nome,
        cpfError: cpfError,
        emailError: emailError,
    });
});

router.post('/admin/new', authAdmin, (req, res) => {
    var { primeiroNome, sobrenome, cpf, rg, cep, rua, bairro, cidade, estado, dataNascimento, email, tipoUsuario, celular, senha, confirmaSenha } = req.body;

    administrador.InsereAdministrador(Admin, res, req, primeiroNome, sobrenome, cpf, rg, cep, rua, bairro, cidade, estado, dataNascimento, email, tipoUsuario, celular, senha);
});

router.get('/admin/administradores', authAdmin, (req, res) => {
    Admin.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(administradores => {
        res.render('administrador/admin/show', {
            administradores: administradores,
            agenda: agenda,
            nomeAdministrador: req.session.admins.nome,
        });
    }).catch(erro => {
        console.log(erro);
    });
});

router.post('/admin/excluir', authAdmin, (req, res) => {
    var { id } = req.body;

    administrador.ExcluirAdmin(id, Admin, res);
});

router.get('/admin/editar', authAdmin, (req, res) => {

    administrador.CriaArquivoEdicao(res, Admin, req);
});

router.post('/admin/edit', authAdmin, (req, res) => {

    var { primeiroNome, sobrenome, cpf, rg, cep, rua, bairro, cidade, estado, dataNascimento, email, tipoUsuario, celular, senha, confirmaSenha, id } = req.body;
    
    administrador.EditaAdministrador(Admin, res, req, id, primeiroNome, sobrenome, cpf, rg, cep, rua, bairro, cidade, estado, dataNascimento, email, tipoUsuario, celular, senha);
});

// RECEBE DADOS DO CLIENTE PELO PAINEL ADMINISTRATIVO
router.post('/admin/user/edit', authAdmin, (req, res) => {
    var { senhaCliente, idCliente } = req.body;
    var senhaError;

    Cliente.findOne({
        where: { id: idCliente }
    }).then(usuario => {
        //    VERIFICAMOS SE A SENHA INFORMADA É IGUAL A DO BANCO
        if (usuario.senha == senhaCliente) {
            Cliente.update({ senha: senhaCliente }, {
                where: { id: idCliente }
            }).then(() => {
                res.redirect('/admin/clientes');
            }).catch(erro => {
                console.log(erro)
            });
        } else {
            //    SE A SENHA FOR DIFERENTE PODEMOS ALTERAR
            if (senhaCliente == undefined || senhaCliente == "" || senhaCliente.length < 8) {
                senhaError = "A senha deve possuir no mínimo 8 caracteres";
                req.flash("senhaError", senhaError);
                res.redirect('/admin/clientes');
            } else {
                var hash = agenda.GeraHashDaSenha(senhaCliente);
                Cliente.update({ senha: hash }, {
                    where: { id: idCliente }
                }).then(() => {
                    res.redirect('/admin/clientes');
                }).catch(erro => {
                    console.log(erro)
                });
            }
        }
    });
});

router.post('/admin/edit/response', authAdmin, (req, res) => {
    var { idCliente, responsavel } = req.body;

    // BORÁ ALTERAR A ADMINISTRAÇÃO DO CLIENTE DE ACORDO COM O ADMIN
    Cliente.update({ administradoreId: responsavel }, {
        where: { id: idCliente }
    }).then(() => {
        res.redirect('/admin/clientes');
    }).catch(erro => {
        console.log(erro);
    });
});

router.post('/admin/delete/cliente', authAdmin, (req, res) => {
    var { idCliente } = req.body;
    usuario.ExluiCliente(Cliente, res, idCliente, "/admin/clientes");
});

router.get('/admin/suporte/cliente', authAdmin, (req, res) => {

    const connectionDatabase = querySql.conectaBanco();

    connectionDatabase.connect(erro => {
        if(erro){
            console.log(erro);
        }

        const sql =`SELECT 
                        sc.id, 
                        sc.primeiroNome,
                        sc.email,
                        sc.celular,
                        sc.telefone,
                        sc.createdAt,
                        rau.resposta
                    FROM 
                        suporte_clientes AS sc 
                    LEFT JOIN 
                        resposta_ajuda_users AS rau ON rau.suporteClienteId = sc.id
                    ORDER BY 
                        sc.id DESC
        `;

        const sqlChat =`SELECT 
                            rau.resposta, 
                            sc.descricao,
                            sc.id
                        FROM 
                            suporte_clientes AS sc 
                        LEFT JOIN 
                            resposta_ajuda_users AS rau ON rau.suporteClienteId = sc.id
        `;
        
        connectionDatabase.query(sql, (erro, suportes) => {
            if(erro){
                console.log(erro);
            }
            connectionDatabase.query(sqlChat, (erro, respostas) => {
                if(erro){
                    console.log(erro);
                }
                res.render('administrador/suporteCliente/show', {
                    suportes: suportes,
                    agenda: agenda,
                    respostas: respostas,
                    nomeAdministrador: req.session.admins.nome,
                });
            });
        });
    });
});

router.post('/admin/suporte/cliente', authAdmin, (req, res) => {
    var { id, resposta, emailDestinatario, primeiroNome, pergunta } = req.body;
    // CADASTRAMOS A RESPOSTA E MANDAMOS UM EMAIL COM A MESMSA
    suporte.CadastraRespostaSuporte(RespSuporte, res, "/admin/suporte/cliente", id, emailDestinatario, resposta);

    email.EnviaEmailSuporte(emailDestinatario, resposta, primeiroNome, pergunta);
});
module.exports = router;