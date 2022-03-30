const express = require('express');
const router = express.Router();
const CategoriaAgenda = require('../src/CategoriaAgenda');
const CategoriaUser = require('./CategoriaUser')
const Categoria = require('./Categoria');
const Agenda = require('../src/Agenda');
const authAdmin = require('../middlewares/adminAuth');

// INSTÂNCIAS USADAS
const categoria = new CategoriaAgenda();
const agenda = new Agenda();

router.get('/admin/categoria', authAdmin, (req, res) => {
    res.render('administrador/categorias/new', {
        nomeAdministrador: req.session.admins.nome,
    });
});

router.post('/admin/categoria', authAdmin, (req, res) => {
    var { nome } = req.body;
    // REALIZO A INSERÇÃO DA CATEGORIA NO BANCO
    categoria.InsereCategoria(res, nome, Categoria);
});

router.get('/admin/categorias', authAdmin, (req, res) => {
    res.render('administrador/categorias/show', {
        nomeAdministrador: req.session.admins.nome,
    });
});

router.post('/admin/categoria/excluir', authAdmin, (req, res) => {
    var { id } = req.body;
    // APAGO A CATEGORIA NO BANCO
    categoria.ExcluirCategoria(res, id, Categoria);
});

router.get('/admin/categoria/:id', authAdmin, (req, res) => {
    var { id } = req.params;
    // CRIA UM ARQUIVO PARA A EDIÇÃO DO DOCUMENTO
    categoria.CriaArquivoParaEdicao(res, id, "categorias", Categoria, req);
});

router.post('/admin/categoria/edit', authAdmin, (req, res) => {
    var { nome, id } = req.body;
    // EDITA DADOS DE UMA CATEGORIA
    categoria.EditaCategoria(res, id, nome, Categoria);
});

// REQUISIÇÕES VIA AJAX
router.get('/admin/categoriaServico', authAdmin, (req, res) => {
    res.render('administrador/categorias/categoriaServico', {
        nomeAdministrador: req.session.admins.nome,
    });
});

router.get('/admin/categoriaUsuario', authAdmin, (req, res) => {
    res.render('administrador/categorias/categoriaUsuario', {
        nomeAdministrador: req.session.admins.nome,
    });
});

router.get('/admin/categoriasUsuario', authAdmin, (req, res) => {
    CategoriaUser.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(categorias => {
        res.render('administrador/categorias/todasCategoriasUsuario', {
            categorias: categorias,
            agenda: agenda,
            nomeAdministrador: req.session.admins.nome,
        });
    }).catch(erro => [
        console.log(erro)
    ]);
});

router.get('/admin/categoriasServico', authAdmin, (req, res) => {
    Categoria.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(categorias => {
        res.render('administrador/categorias/todasCategoriasServico', {
            categorias: categorias,
            agenda: agenda,
            nomeAdministrador: req.session.admins.nome,
        });
    }).catch(erro => [
        console.log(erro)
    ]);
});

//---------------------------------------------------------- CATEGORIAS DE CLIENTES
router.post('/admin/categoria/cliente', authAdmin, (req, res) => {
    var { nome } = req.body;
    // REALIZO A INSERÇÃO DA CATEGORIA NO BANCO
    categoria.InsereCategoria(res, nome, CategoriaUser);
});

router.post('/admin/categoria/cliente/excluir', authAdmin, (req, res) => {
    var { id } = req.body;
    // APAGO A CATEGORIA NO BANCO
    categoria.ExcluirCategoria(res, id, CategoriaUser);
});

router.get('/admin/categoria/cliente/:id', authAdmin, (req, res) => {
    var { id } = req.params;
    // CRIA UM ARQUIVO PARA A EDIÇÃO DO DOCUMENTO
    categoria.CriaArquivoParaEdicaoCliente(res, id, "categorias", CategoriaUser, req);
});

router.post('/admin/categoria/edit/cliente', authAdmin, (req, res) => {
    var { nome, id } = req.body;
    // EDITA DADOS DE UMA CATEGORIA
    categoria.EditaCategoria(res, id, nome, CategoriaUser);
});

module.exports = router;