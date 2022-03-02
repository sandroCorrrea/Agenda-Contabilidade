// VALIDAÇÃO DO FORMULÁRIO
function limpa_formulário_cep() {
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        
        document.getElementById('rua').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('cidade').value=(conteudo.localidade);
        document.getElementById('uf').value=(conteudo.uf);
    }
    else {
        
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {
    
    var cep = valor.replace(/\D/g, '');

    if (cep != "") {

        var validacep = /^[0-9]{8}$/;

        if(validacep.test(cep)) {

            document.getElementById('rua').value="...";
            document.getElementById('bairro').value="...";
            document.getElementById('cidade').value="...";
            document.getElementById('uf').value="...";

            var script = document.createElement('script');

            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            document.body.appendChild(script);

        }
        else {
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    }
    else {
        limpa_formulário_cep();
    }
};
// FINAL DA VALIDAÇÃO DO FORMULÁRIO

//VALIDAÇÃO DE FORMULÁRIO CADASTRO DE CLIENTES
$(document).ready(() => {
    $('#cep').mask('00000-000');
    $('#cpf').mask('000.000.000-00');
    $('#numeroRg').mask('00.000.000');
    $('#telefone').mask('(00)-0000-0000');
    $('#celular').mask('(00)-00000-0000');

    $('#cadastraCliente').validate({
        rules:{
            nome:{
                minlength: 10,
                maxlength: 100
            },
            email:{
                minlength: 10,
                maxlength: 120
            },
            cpf:{
                cpfBR: true
            },
            cep:{
                minlength: 9,
                maxlength: 9
            },
            rua:{
                minlength: 10,
                maxlength: 80
            },
            bairro:{
              minlength: 5,
              maxlength: 80
            },
            cidade:{
              minlength: 4,
              maxlength: 50
            },
            uf:{
              minlength: 2,
              maxlength: 50
            },
            dataNascimento:{
                minlength: 10,
                maxlength: 10
            },
            numeroIdentidade:{
                minlength: 10,
                maxlength: 10
            },
            orgaoExpeditor:{
                minlength: 1,
                maxlength: 6
            },
            telefone:{
                minlength: 14,
                maxlength: 14
            },
            celular:{
                minlength: 15,
                maxlength: 15
            },
            senha:{
                minlength: 8
            },
            confirmaSenha:{
                equalTo: '#senha'
            }
        }
    });
});


var verificaSeletores = () => {
    var categoriaCliente = parseInt(formUser.categoriaCliente.value);
    var estadoRg         = parseInt(formUser.estadoRg.value); 
    var dataNascimento   = formUser.dataNascimento.value;

    var nasc = dataNascimento.split("-").map(Number);
    
    var depois18Anos = new Date(nasc[0] + 18, nasc[1] - 1, nasc[2]);
    var agora = new Date();
  
    if (depois18Anos >= agora){
        alert("Idade insuficiente para continuar no cadastro !");
        return false;
    }

    if(categoriaCliente == 0){
        alert("Selecione uma categoria !");
        return false;
    }

    if(estadoRg == 0){
        alert("Selecione um estado !");
        return false;
    }
}