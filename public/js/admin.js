// ADICIONANDO MASCARA AOS CAMPOS COM JQUERY
$(document).ready(() => {
  $('#cpf').mask('000.000.000-00');

  var digitosCaracteres = {
    'translation':{
      A: {
        pattern: /[A-Za-z]/
      }
    }
  };

  $('#rg').mask('AA-00.000.000-0', digitosCaracteres);
  // 69630-970
  $('#cep').mask('00000-000');

  $('#cel').mask('(00)-00000-0000');
});

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

// VALIDAÇÃO DO FORMULÁRIO
$(document).ready(() => {
  $('#cadastroAdmin').validate({
      rules:{
          primeiroNome:{
            minlength: 3,
            maxlength: 10
          },
          sobrenome:{
            minlength: 5,
            maxlength: 50,
          },
          cpf:{
            // minlength: 14,
            // maxlength: 14
            cpfBR: true
          },
          rg:{
            minlength: 15,
            maxlength: 15
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
          estado:{
            minlength: 2,
            maxlength: 50
          },
          dataNascimento:{
            minlength: 10,
            maxlength: 10
          },
          email:{
            minlength: 10
          },
          celular:{
            minlength: 15,
            maxlength: 15
          },
          senha:{
            minlength: 8
          },
          confirmaSenha:{
            minlength: 8
          }
      }
  });
});

// VALIDA SE AS SENHAS ESTÃO DIFERENTES
var validaSenhas = () => {
  var senha         = cadastroAdministradores.senha.value;
  var confirmeSenha = cadastroAdministradores.confirmaSenha.value;

  if (senha != confirmeSenha) {
    alert('Senhas Diferentes !');

    cadastroAdministradores.confirmaSenha.focus;
    return false;
  }else{
    return true;
  }
}