const Categoria     = require('../Categoria/Categoria');
const CategoriaUser = require('../Categoria/CategoriaUser');

class Servico{
    constructor(){
        this.nome        = "";
        this.abreviatura = "";
        this.apelido     = "";
    }

    InsereServico(res, modal, nome, abreviatura, apelido, categoriumId, clienteCategoriumId){
        modal.create({
            nome               : nome,
            abreviatura        : abreviatura,
            apelido            : apelido,
            categoriumId       : categoriumId,
            clienteCategoriumId: clienteCategoriumId
        }).then(() => {
            res.redirect('/admin/services');
        }).catch(erro => {
            console.log(erro);
        });
    }

    ExcluiServico(res, modal, id){
        if(id != undefined){
            if (!isNaN(id)){
                modal.destroy({
                    where: {id: id}
                }).then(() => {
                    res.redirect('/admin/services');
                }).catch(erro => {
                    console.log(erro);
                });
            }else{
                res.redirect('/admin/services');
            }
        }else{
            res.redirect('/admin/services');
        }
    }

    CriaArquivoParaEdicao(res, modal, id, req){
        if(!isNaN(id)){
            modal.findByPk(id).then(servicos => {
                if(servicos != undefined){
                    Categoria.findAll().then(categorias => {
                        CategoriaUser.findAll().then(categoriasUser => {
                            res.render('administrador/services/edit', {
                                servicos      : servicos,
                                categorias    : categorias,
                                categoriasUser: categoriasUser,
                                nomeAdministrador: req.session.admins.nome,
                            });
                        });
                    });
                }else{
                    res.redirect('/admin/services');
                }
            }).catch(erro => {
                console.log(erro);
            });
        }else{
            res.redirect('/admin/services');
        }
    }

    EditaServico(nome, abreviatura, apelido, categoria, modal, res, id, categoriaCliente){
        if (!isNaN(id)) {
            if (id != undefined) {
                modal.update({nome: nome, abreviatura: abreviatura, apelido: apelido, categoriumId: categoria, clienteCategoriumId: categoriaCliente}, {
                    where:{id: id}
                }).then(() => {
                    res.redirect('/admin/services');
                }).catch(erro => {
                    console.log(erro);
                });
            }else{
                res.redirect('/admin/services');
            }
        }else{
            res.redirect('/admin/services');
        }
    }

}

module.exports = Servico;