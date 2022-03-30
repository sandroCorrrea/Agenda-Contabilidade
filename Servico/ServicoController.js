const express = require('express');
const router = express.Router();
const ServicoModal = require('./Servico');
const Categoria = require('../Categoria/Categoria');
const servicoAgenda = require('../src/Servico');
const Agenda = require('../src/Agenda');
const CategoriaUser = require('../Categoria/CategoriaUser');
const authAdmin = require('../middlewares/adminAuth');

// INSTÂNCIAS USADAS
const servico = new servicoAgenda();
const agenda = new Agenda();

router.get('/admin/service', authAdmin, (req, res) => {
    Categoria.findAll().then(categorias => {
        CategoriaUser.findAll().then(categoriaUser => {
            res.render('administrador/services/new', {
                categorias: categorias,
                categoriaUser: categoriaUser,
                nomeAdministrador: req.session.admins.nome,
            });
        });
    });
});

router.post('/admin/servico', authAdmin, (req, res) => {
    var { nome, apelido, abreviatura, agendaCategoriumId, clienteCategoriumId } = req.body;

    servico.InsereServico(res, ServicoModal, nome, abreviatura, apelido, agendaCategoriumId, clienteCategoriumId);
});

router.get('/admin/services', authAdmin, (req, res) => {
    ServicoModal.findAll({
        order: [
            ['id', 'DESC']
        ],
        include: [
            { model: Categoria },
            { model: CategoriaUser },
        ],
    }).then(servicos => {
        res.render('administrador/services/show', {
            servicos: servicos,
            agenda: agenda,
            nomeAdministrador: req.session.admins.nome,
        })
    }).catch(erro => {
        console.log(erro);
    });
});

router.post('/admin/service/excluir', authAdmin, (req, res) => {
    var { id } = req.body;

    servico.ExcluiServico(res, ServicoModal, id);
});

router.get('/admin/service/edita/:id', authAdmin, (req, res) => {
    var { id } = req.params;

    servico.CriaArquivoParaEdicao(res, ServicoModal, id, req);
});

router.post('/admin/servico/edita', authAdmin, (req, res) => {
    var { nome, abreviatura, apelido, agendaCategoriumId, id, clienteCategoriumId } = req.body;

    servico.EditaServico(nome, abreviatura, apelido, agendaCategoriumId, ServicoModal, res, id, clienteCategoriumId);
});

module.exports = router;