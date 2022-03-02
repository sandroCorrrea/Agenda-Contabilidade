class CategoriaAgenda{

    constructor(){
        this.nomeCategoria = "";
    }

    InsereCategoria(res, nomeCategoria, modal){
        modal.create({
            nome: nomeCategoria,
        }).then(() => {
            res.redirect('/admin/categorias');
        }).catch(erro => {
            console.log(erro);
        })
    }

    ExcluirCategoria(res, idCategoria, modal){
        if (idCategoria != undefined) {
            if (!isNaN(idCategoria)) {
                modal.destroy({
                    where: {id: idCategoria}
                }).then(() => {
                    res.redirect('/admin/categorias');
                }).catch(erro => {
                    console.log("deu merda no log");
                });
            }else{
                res.redirect('deu ruim aqui');
            }
        }else{
            res.send('deu ruim');
        }
    }

    CriaArquivoParaEdicao(res, id, categorias, modal){
        if(id != undefined){
            if (!isNaN(id)) {
                modal.findByPk(id).then(categorias => {
                    if (categorias != undefined) {
                        res.render('administrador/categorias/edit', {
                            categorias: categorias,
                        })
                    }else{
                        res.redirect("/admin/categorias");
                    }
                }).catch(erro => {
                    console.log(erro);
                });
            }else{
                res.redirect("/admin/categorias");
            }
        }else{
            res.redirect("/admin/categorias");
        }
    }

    EditaCategoria(res, idCategoria, nomeCategoria, modal){
        modal.update({nome: nomeCategoria}, {
            where: {id: idCategoria}
        }).then(() => {
            res.redirect('/admin/categorias')
        }).catch(erro => {
            console.log(erro);
        });
    }

    //------------------------------------------- EDIÇÃO DE DADOS DA CATEGORIAS DE CLIENTE
    CriaArquivoParaEdicaoCliente(res, id, categorias, modal){
        if(id != undefined){
            if (!isNaN(id)) {
                modal.findByPk(id).then(categorias => {
                    if (categorias != undefined) {
                        res.render('administrador/categorias/editCliente', {
                            categorias: categorias,
                        })
                    }else{
                        res.redirect("/admin/categorias");
                    }
                }).catch(erro => {
                    console.log(erro);
                });
            }else{
                res.redirect("/admin/categorias");
            }
        }else{
            res.redirect("/admin/categorias");
        }
    }
}

module.exports = CategoriaAgenda;