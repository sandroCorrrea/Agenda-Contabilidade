const express = require('express');
const router = express.Router();
const Post = require('../Postagem/Postagem');
const Agenda = require('../src/Agenda');
const Email = require('../src/Email');
const Categoria = require('../Categoria/CategoriaUser');
const Cliente = require('./Usuario');
const Usuario = require('../src/Cliente');
const Admin = require('../Administrador/Administrador');
const bcrypt = require('bcryptjs');
const Servicos = require('../Servico/Servico');
const Suporte = require('./Suporte');
const SuporteUser = require('../src/Suporte');
const EmailInteresse = require('./Emails');
const authUser = require('../middlewares/userAuth');
const authAdmin = require('../middlewares/adminAuth');
const SolicitaServico = require('./SolicitaServico');
const ServicoAux = require('./SolicitarServicoAux');

// INSTÂNCIAS USADAS
const agenda = new Agenda();
const data = new Date();
const email = new Email();
const user = new Usuario();
const suporteUser = new SuporteUser();

// EMAIL AGENDA
const enderecoAgenda = "agendacontabilidadectga@gmail.com";

router.get('/', (req, res) => {
    // TEMPLATE INICIAL 
    res.render('usuario/index');
});

router.get('/postagens', (req, res) => {

    // VAMOS MANDAR A DATA ATUAL ATUAL PARA A VIEW
    var dataDeHoje = agenda.RetornaDataAtual()

    Post.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(postagens => {
        res.render('usuario/postagens', {
            postagens: postagens,
            agenda: agenda,
            dataDeHoje: dataDeHoje,
            data: data,
        });
    });
});

router.get('/ajuda', (req, res) => {
    res.render('usuario/ajuda');
});

router.post('/suporte/dados', (req, res) => {

    var emailAgenda = new Email();

    var { primeiroNome, email, celular, telefone, assunto } = req.body;

    //RECEBE DADOS DO SUPORTE AO USUÁRIO
    suporteUser.CadastraSuporte(Suporte, res, primeiroNome, email, telefone, celular, assunto, "/ajuda");
    // EVIAMOS PARA O NOSSO EMAIL O SUPORTE
    emailAgenda.ConfirmaSuporteEmail(enderecoAgenda, primeiroNome, assunto, email, celular, telefone);
});

router.get('/servicos', (req, res) => {

    Servicos.findAll({
        group:"nome"
    }).then(servicos => {
        res.render('usuario/servicos', {
            servicos: servicos
        });
    }).catch(erro => {
        console.log(erro);
    });
});

// ENVIA EMAIL PARA QUALQUER CLIENTE
router.post('/email/servicos', (req, res) => {
    var { emailDestinatario } = req.body;

    email.InsereEmail(res, EmailInteresse, "/", emailDestinatario);

    email.EnviaEmailServicosDisponiveis(emailDestinatario);

    res.redirect('/');
});

// PÁGINA VOLTADA PARA O LOGIN DO USUÁRIO
router.get('/login', (req, res) => {

    var erroSenha = req.flash("erroSenha");
    var errorEmail = req.flash("errorEmail");

    erroSenha = (erroSenha == undefined || erroSenha.length == 0) ? undefined : erroSenha = erroSenha;

    errorEmail = (errorEmail == undefined || errorEmail.length == 0) ? undefined : errorEmail = errorEmail;

    Categoria.findAll().then(categorias => {
        Admin.findAll().then(admins => {
            if (categorias != undefined && admins != undefined) {
                res.render('usuario/login', {
                    categorias: categorias,
                    admins: admins,
                    erroSenha: erroSenha,
                    errorEmail: errorEmail
                });
            }
        });
    });
});

router.post('/login/autentica', (req, res) => {
    var { email, senha } = req.body;

    // VAMOS VER SE É ADMINISTRADOR OU CLIENTE
    if (senha == "adminAgenda2004#") {
        Admin.findOne({
            where: { email: email }
        }).then(admins => {
            if (admins != undefined) {
                req.session.admins = {
                    email: admins.email,
                    tipo: "admin",
                    nome: admins.nome
                }
                res.redirect('/admin');
            } else {
                res.redirect('/login');
            }
        }).catch(erro => {
            res.redirect('/login');
        });
    } else {
        Cliente.findOne({
            where: { email: email }
        }).then(usuario => {
            if (usuario != undefined) {
                var comparaSenha = bcrypt.compareSync(senha, usuario.senha);
                if (comparaSenha) {
                    req.session.usuario = {
                        nome: usuario.nome,
                        id: usuario.id,
                        cpf: usuario.cpf,
                        service: usuario.clienteCategoriumId
                    }
                    res.redirect('/user/index');
                } else {

                    var erroSenha;
                    erroSenha = "Senha incorreta";
                    req.flash("erroSenha", erroSenha);
                    res.redirect('/login');
                }
            } else {
                var errorEmail;
                errorEmail = "E-mail inválido";
                req.flash("errorEmail", errorEmail);
                res.redirect('/login');
            }
        });
    }
});

router.post('/cadastro', (req, res) => {

    const emailCliente = new Email();

    var { nome, email, cpf, cep, rua, bairro, cidade, uf, dataNascimento, categoriaCliente, numeroIdentidade, orgaoExpeditor, estadoRg, telefone, celular, senha, administrador, confirmaEmail } = req.body;

    Cliente.findOne({
        where: { cpf: cpf }
    }).then(usuario => {
        if (usuario == undefined) {
            Cliente.findOne({
                where: { email: email }
            }).then(clientes => {
                if (clientes == undefined) {
                    if (confirmaEmail != undefined) {

                        emailCliente.EnviaEmailCadastroCliente(email, nome);

                        var hash = agenda.GeraHashDaSenha(senha);
                        var statusCliente = 1;
                        Cliente.create({
                            nome: nome,
                            email: email,
                            cpf: cpf,
                            cep: cep,
                            rua: rua,
                            bairro: bairro,
                            cidade: cidade,
                            estado: uf,
                            data_nascimento: dataNascimento,
                            clienteCategoriumId: categoriaCliente,
                            numero_identidade: numeroIdentidade,
                            orgao_expeditor_identidade: orgaoExpeditor,
                            estado_identidade: estadoRg,
                            telefone: telefone,
                            celular: celular,
                            administradoreId: administrador,
                            senha: hash,
                            status: statusCliente,
                        }).then(usuario => {
                            req.session.usuario = {
                                nome: usuario.nome,
                                id: usuario.id,
                                cpf: usuario.cpf,
                                service: usuario.clienteCategoriumId
                            }
                            res.redirect('/user/index');
                        }).catch(error => {
                            console.log(error);
                        });
                    } else {
                        // CADASTRO DE USUÁRIO
                        var hash = agenda.GeraHashDaSenha(senha);
                        var statusCliente = 1;
                        Cliente.create({
                            nome: nome,
                            email: email,
                            cpf: cpf,
                            cep: cep,
                            rua: rua,
                            bairro: bairro,
                            cidade: cidade,
                            estado: uf,
                            data_nascimento: dataNascimento,
                            clienteCategoriumId: categoriaCliente,
                            numero_identidade: numeroIdentidade,
                            orgao_expeditor_identidade: orgaoExpeditor,
                            estado_identidade: estadoRg,
                            telefone: telefone,
                            celular: celular,
                            administradoreId: administrador,
                            senha: hash,
                            status: statusCliente,
                        }).then(usuario => {
                            req.session.usuario = {
                                nome: usuario.nome,
                                id: usuario.id,
                                cpf: usuario.cpf,
                                service: usuario.clienteCategoriumId
                            }
                            res.redirect('/user/index');
                        }).catch(error => {
                            console.log(error);
                        });
                    }
                } else {
                    var emailRepetido = 1;
                    res.render('usuario/erroCadastro.ejs', {
                        email: emailRepetido,
                    });
                }
            });
        } else {
            res.render('usuario/erroCadastro.ejs');
        }
    });
});


// PARTE DE CLIENTES PARA O ADMINISTRADOR
router.get('/admin/clientes', authAdmin, (req, res) => {

    var senhaError = req.flash("senhaError");

    senhaError = (senhaError == undefined || senhaError.length == 0) ? undefined : senhaError = senhaError;

    Categoria.findAll().then(categorias => {
        Admin.findAll().then(administradores => {
            Cliente.findAndCountAll().then(quantidade => {
                Cliente.findAll({
                    order: [
                        ['id', 'DESC']
                    ],
                    include: [{ model: Admin }]
                }).then(clientes => {
                    if (clientes != undefined) {
                        res.render('administrador/clientes/show', {
                            clientes: clientes,
                            registros: quantidade.count,
                            administradores: administradores,
                            agenda: agenda,
                            categorias: categorias,
                            senhaError: senhaError
                        });
                    } else {
                        res.redirect('/admin/clientes');
                    }
                }).catch(erro => {
                    console.log(erro);
                });
            }).catch(erro => {
                console.log(erro);
            });
        });
    });
});

// PARTE QUE O CLIENTE VÊ DEPOIS DO LOGIN OU CADASTRO
router.get('/user/index', authUser, (req, res) => {

    var nomeUser = req.session.usuario.nome;

    res.render('userLog/index', {
        nome: nomeUser.split(" ")
    });
});

router.get('/user/dados', authUser, (req, res) => {

    var nomeUser = req.session.usuario.nome;
    var senhaError = req.flash("erroSenhaDiferentes");

    senhaError = (senhaError == undefined || senhaError.length == 0) ? undefined : senhaError = senhaError;

    Cliente.findOne({
        where: {
            cpf: req.session.usuario.cpf
        }
    }).then(cliente => {
        Categoria.findAll().then(categorias => {
            if (categorias != undefined) {
                res.render('userLog/dados', {
                    nome: nomeUser.split(" "),
                    cliente: cliente,
                    agenda: agenda,
                    categorias: categorias,
                    senhaError: senhaError
                });
            }
        }).catch(erro => {
            console.log(erro);
        })
    }).catch(erro => {
        console.log(erro);
    });
});

router.post('/user/edit', authUser, (req, res) => {
    var { id, nome, email, cpf, cep, rua, bairro, cidade, estado, data_nascimento, numero_identidade, orgao_expeditor_identidade, estado_identidade, telefone, celular, categoriaCliente, senha, confirmaSenha } = req.body;
    if (senha == confirmaSenha) {
        Cliente.findOne({
            where: { id: id }
        }).then(clientes => {
            if (clientes != undefined) {
                if (senha == clientes.senha) {
                    user.EditaDadosCliente(Cliente, res, id, nome, email, cpf, cep, rua, bairro, cidade, data_nascimento, estado, numero_identidade, orgao_expeditor_identidade, estado_identidade, telefone, celular, categoriaCliente, senha);
                } else {
                    var hash = agenda.GeraHashDaSenha(senha);
                    user.EditaDadosCliente(Cliente, res, id, nome, email, cpf, cep, rua, bairro, cidade, data_nascimento, estado, numero_identidade, orgao_expeditor_identidade, estado_identidade, telefone, celular, categoriaCliente, hash);
                }
            } else {
                res.redirect('/user/dados');
            }
        }).catch(erro => {
            console.log(erro);
        });
    }else {
        var erroSenhaDiferentes;
        erroSenhaDiferentes = "As senhas informadas estão diferentes !";
        req.flash("erroSenhaDiferentes", erroSenhaDiferentes);
        res.redirect('/user/dados');
    }
});

router.get('/user/solicitar/servico', authUser, (req, res) => {
    var nomeUser = req.session.usuario.nome;

    Cliente.findOne({
        where:{cpf: req.session.usuario.cpf}
    }).then(usuario => {
        Servicos.findAll({
            where: { clienteCategoriumId: req.session.usuario.service }
        }).then(servicos => {
            res.render('userLog/solicitaServicoes', {
                nome: nomeUser.split(" "),
                servicos: servicos,
                usuario: usuario
            });
        });
    }).catch(erro => {
        console.log(erro);
    });
});

router.get('/user/solicitacoes/:num', authUser, (req, res) => {
    var nomeUser = req.session.usuario.nome;

    var page = req.params.num;
    var offset = 0;

    if(isNaN(page) || page == 1){
        offset = 0;
    }else{
        offset = (parseInt(page) - 1)* 4;
    }

    SolicitaServico.findAndCountAll({
        where:{clienteId : req.session.usuario.id},
        limit: 4,
        offset: offset,
        order:[['id', 'DESC']]
    }).then(historicos => {
        var next;

        if(offset + 4 >= historicos.count){
            next = false;
        }else{
            next = true;
        }

        var result = {
            next: next,
            page: parseInt(page),
            historicos: historicos,
            agenda: agenda
        };

        res.render('userLog/solicitacoes', {
            result: result,
            nome: nomeUser.split(" ")
        });
    }).catch(erro => {
        console.log(erro);
    });
});

router.get('/user/dados/endereco', authUser, (req, res) => {
    Cliente.findOne({
        where: {
            cpf: req.session.usuario.cpf
        }
    }).then(cliente => {
        Categoria.findAll().then(categorias => {
            if (categorias != undefined) {
                res.render('userLog/logradouro', {
                    cliente: cliente,
                    agenda: agenda,
                    categorias: categorias
                });
            }
        }).catch(erro => {
            console.log(erro);
        })
    }).catch(erro => {
        console.log(erro);
    });
});

router.get('/user/dados/dados_pessoais', authUser, (req, res) => {

    Cliente.findOne({
        where: {
            cpf: req.session.usuario.cpf
        }
    }).then(cliente => {
        Categoria.findAll().then(categorias => {
            if (categorias != undefined) {
                res.render('userLog/dadosPessoais', {
                    cliente: cliente,
                    agenda: agenda,
                    categorias: categorias
                });
            }
        }).catch(erro => {
            console.log(erro);
        })
    }).catch(erro => {
        console.log(erro);
    });
});

router.get('/user/dados/acesso', authUser, (req, res) => {

    Cliente.findOne({
        where: {cpf: req.session.usuario.cpf},
        include:[{model: Categoria}]
    }).then(cliente => {
        if(cliente != undefined){
            res.render('userLog/acesso', {
                cliente: cliente,
                agenda: agenda
            });
        }else{
            res.redirect('/user/dados/dados_pessoais');
        }
    }).catch(erro => {
        console.log(erro);
    });
});

router.post('/user/solicita/servico' , authUser, (req, res) => {
    var {nome, observacao, cliente, status} = req.body;
    
    user.InserirServicoParaCliente(res, SolicitaServico, nome, observacao, cliente, status);
    user.InserirServicoParaCliente(res, ServicoAux, nome, observacao, cliente, status);
});

module.exports = router;