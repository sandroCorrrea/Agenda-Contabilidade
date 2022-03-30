const express = require('express');
const router = express.Router();
const Postagem = require('./Postagem');
const Post = require('../src/Postagem');
const Agenda = require('../src/Agenda');
const authAdmin = require('../middlewares/adminAuth');

// INSTÂNCIAS USADAS
const postagem = new Post();
const agenda = new Agenda();

router.get('/admin/postagem', authAdmin, (req, res) => {
    res.render('administrador/postagens/new', {
        nomeAdministrador: req.session.admins.nome,
    });
});

router.post('/admin/postagem', authAdmin, (req, res) => {

    var { titulo, dataInicio, dataFim, corpoPostagem } = req.body;

    postagem.InserePostagem(res, dataInicio, dataFim, corpoPostagem, titulo, Postagem);
});

router.get('/admin/postagens', authAdmin, (req, res) => {

    Postagem.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(postagens => {
        res.render('administrador/postagens/show', {
            postagens: postagens,
            agenda: agenda,
            nomeAdministrador: req.session.admins.nome,
        });
    }).catch(erro => {
        console.log(erro);
    });
});

router.post('/admin/post/excluir', authAdmin, (req, res) => {
    var { id } = req.body;

    postagem.ExcluirPostagem(id, Postagem, res);
});

router.get('/admin/postagem/:id', authAdmin, (req, res) => {

    var { id } = req.params;

    postagem.CriaArquivoParaEdicao(id, res, Postagem, req);
});

router.post('/admin/postagem/edit', authAdmin, (req, res) => {
    var { titulo, dataInicio, dataFim, corpoPostagem, id } = req.body;

    postagem.EditaPostagem(Postagem, id, dataInicio, dataFim, titulo, corpoPostagem, res);
});

module.exports = router;