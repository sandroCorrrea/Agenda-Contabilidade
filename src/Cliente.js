const Agenda = require('./Agenda');

class Cliente extends Agenda{

    InsereCliente(modal, res, nomeUser, email, cpf, cep, rua, bairro, cidade, uf, dataNascimento, categoriaCliente, administrador, numeroIdentidade, orgaoExpeditor, estadoRg, telefone, celular, senha){

        var hash = this.GeraHashDaSenha(senha);
        var statusCliente = 1;
        modal.create({
            nome: nomeUser,
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
                nomeUser: usuario.nome,
                idUser  : usuario.id,
                cpfUser : usuario.cpf
            }
            res.render('userLog/index', {
                dados: req.session.usuario,
            });
        }).catch(error => {
            console.log(error);
        })
    }

    EditaDadosCliente(modal, res, idUser, nomeUser, emailUser, cpfUser, cepUser, ruaUser, bairroUser, cidadeUser, dataNascimentoUser, estadoUser, numeroRgUser, orgaoExpeditorUser, estadoRgUser, telefoneUser, celularUser, categoriaUser, senhaCliente){

        modal.update({nome: nomeUser, email: emailUser, cpf: cpfUser, cep: cepUser, rua: ruaUser, bairro: bairroUser, cidade: cidadeUser, estado: estadoUser, data_nascimento: dataNascimentoUser, numero_identidade: numeroRgUser, orgao_expeditor_identidade: orgaoExpeditorUser, estado_identidade: estadoRgUser, telefone: telefoneUser, celular: celularUser, clienteCategoriumId: categoriaUser, senha: senhaCliente}, {
            where: {id: idUser}
        }).then(() => {
            res.redirect('/user/dados');
        }).catch(erro => {
            console.log(erro);
        });
    }

    ExluiCliente(modal, res, codigoCliente, rotaResposta){
        if(codigoCliente != undefined){
            if(!isNaN(codigoCliente)){
                modal.destroy({
                    where:{id: codigoCliente}
                }).then(() => {
                    res.redirect(rotaResposta);
                }).catch(erro => {
                    console.log(erro);
                });
            }else{
                res.redirect(rotaResposta);
            }
        }else{
            res.redirect(rotaResposta);
        }
    }

    InserirServicoParaCliente(res, modal, nome, observacao, cliente, statusServico){
        
        modal.create({
            assunto  : nome,
            descricao: observacao,
            clienteId: cliente,
            status   : statusServico
        }).then(() => {
            res.redirect('/user/solicitacoes/1');
        }).catch(erro => {
            console.log(erro);
        });
    }
}

module.exports = Cliente;