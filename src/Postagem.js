const Agenda = require('./Agenda');

class Postagem extends Agenda{

    InserePostagem(res, dataInicio, dataFim, corpo, titulo, modal){

        if (dataFim == null || dataFim == undefined || dataFim == " "){
            dataFim = "0000-00-00";
        }

        if (dataInicio == null || dataInicio == undefined || dataInicio == " ") {
            dataInicio = "0000-00-00";
        }

        modal.create({
            titulo        : titulo,
            dataFim       : dataFim,
            dataInicio    : dataInicio,
            corpoPostagem : corpo,
        }).then(() => {
            res.redirect('/admin/postagens');
        }).catch(erro => {
            console.log(erro);
        });
    }

    ExcluirPostagem(id, modal, res){
        if(!isNaN(id)){
            if(id != undefined){
                modal.destroy({
                    where: {id: id}
                }).then(() => {
                    res.redirect('/admin/postagens');
                }).catch(erro => {
                    console.log(erro);
                });
            }else{
                res.redirect('/admin/postagens');
            }
        }else{
            res.redirect('/admin/postagens');
        }
    }

    CriaArquivoParaEdicao(id, res, modal){
        modal.findByPk(id).then(posts => {
            if (posts != undefined) {
                res.render('administrador/postagens/edit', {
                    posts: posts
                });
            }else{
                res.redirect('/admin/postagens');
            }
        }).catch(erro => {
            console.log(erro);
        });
    }

    EditaPostagem(modal, id, dataInicio, dataFim, titulo, corpo, res){
        if(!isNaN(id)){
            if (id != undefined){
                modal.update({titulo: titulo, dataInicio: dataInicio, dataFim: dataFim, corpoPostagem: corpo}, {
                    where: {id: id}
                }).then(() => {
                    res.redirect('/admin/postagens');
                }).catch(erro => {
                    console.log(erro);
                });
            }else{
                res.redirect('/admin/postagens');
            }
        }else{
            res.redirect('/admin/postagens');
        }
    }
}

module.exports = Postagem;