const Agenda = require('./Agenda');

class Administrador extends Agenda{

    InsereAdministrador(modal, res, req, nome, sobrenome, cpf, rg, cep, rua, bairro, cidade, estado, dataNascimento, email, tipoUsuario, celular, senha){
        if (req.file == undefined || req.file == null || req.file.originalname == " ") {
            // QUER DIZER QUE NÃO EXISTE IMAGEM
            var img = false;
        }else{
            // QUER DIZER QUE EXISTE IMAGEM
            var img = req.file.filename;
        }
        
        var hash = this.GeraHashDaSenha(senha);
    
        if (tipoUsuario == null || tipoUsuario == undefined || tipoUsuario == "") {
            tipoUsuario = "admin";
        }
    
        modal.create({
            foto:           img,
            nome:           nome,
            sobrenome:      sobrenome,
            cpf:            cpf,
            rg:             rg,
            cep:            cep,
            rua:            rua,
            bairro:         bairro,
            cidade:         cidade,
            estado:         estado,
            dataNascimento: dataNascimento,
            email:          email,
            tipoUsuario:    tipoUsuario,
            celular:        celular,
            senha:          hash,
        }).then(() => {
            res.redirect('/admin/administradores');
        }).catch(erro => {
            console.log(erro);
        });
    }

    ExcluirAdmin(idAdmin, modal, res){

        if (!isNaN(idAdmin)) {
            if (idAdmin != undefined) {
                modal.destroy({
                    where:{id: idAdmin}
                }).then(() => {
                    res.redirect('/admin/administradores');
                }).catch(erro => {
                    console.log(erro);
                });
            }else{
                res.redirect('/admin/administradores');
            }
        }else{
            res.redirect('/admin/administradores');
        }
    }

    CriaArquivoEdicao(id, res, modal, req){
        if(isNaN(id)){
            res.redirect('/admin/administradores');
        }else{
            modal.findOne({
                where: {id: id}
            }).then(admins => {
                if (admins != undefined){
                    res.render('administrador/admin/edit', {
                        admins: admins,
                        nomeAdministrador: req.session.admins.nome,
                    })
                }else{
                    res.redirect('/admin/administradores');
                }
            }).catch(erro => {
                console.log(erro);
            });
        };
    }

    EditaAdministrador(modal, res, req, id, nome, sobrenome, cpf, rg, cep, rua, bairro, cidade, estado, dataNascimento, email, tipoUsuario, celular, senha){
        if (req.file == undefined || req.file == null || req.file.originalname == " ") {
            // QUER DIZER QUE NÃO EXISTE IMAGEM
            var img = false;
        }else{
            // QUER DIZER QUE EXISTE IMAGEM
            var img = req.file.filename;
        }
        
        var hash = this.GeraHashDaSenha(senha);

        if (!isNaN(id)) {
            if(id != undefined){
                modal.update({nome: nome, sobrenome: sobrenome, cpf: cpf, rg: rg, cep: cep, rua: rua, bairro: bairro, cidade: cidade, estado: estado, dataNascimento: dataNascimento, email: email, tipoUsuario: tipoUsuario, celular: celular, senha: hash, foto: img}, {
                    where:{id: id}
                }).then(() => {
                    res.redirect('/admin/administradores');
                }).catch(erro => {
                    console.log(erro);
                })
            }else{
                res.redirect('/admin/administradores');
            }
        }else{
            res.redirect('/admin/administradores');
        }
    }

}

module.exports = Administrador;