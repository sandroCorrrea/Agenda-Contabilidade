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

        modal.findOne({
            where:{cpf: cpf}
        }).then(adminCadastrado => {
            if(adminCadastrado != undefined){
                var cpfError;
                cpfError = "Esse CPF já foi cadastrado!";
                req.flash("cpfError", cpfError);
                res.redirect('/admin/new');
            }else{
                modal.findOne({
                    where:{email: email}
                }).then(adminEmail => {
                    if(adminEmail != undefined){
                        var emailError;
                        emailError = "Esse E-mail já foi cadastrado!";
                        req.flash("emailError", emailError);
                        res.redirect('/admin/new');
                    }else{
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
                });
            }
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

    CriaArquivoEdicao(res, modal, req){
        modal.findOne({
            where: {email: req.session.admins.email}
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
                    res.redirect('/admin/editar');
                }).catch(erro => {
                    console.log(erro);
                })
            }else{
                res.redirect('/admin/editar');
            }
        }else{
            res.redirect('/admin/editar');
        }
    }

}

module.exports = Administrador;