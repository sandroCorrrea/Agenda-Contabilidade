var exibeDadosUser = (url) => {
    let ajax = new XMLHttpRequest();

    ajax.open('get', url);

    ajax.onreadystatechange = () =>{
        if(ajax.readyState == 4 && ajax.status == 200){
            document.getElementById('logradouro').innerHTML = ajax.responseText;
        }
    }

    ajax.send();
}

var confirmFormulario = () =>{

    var senha        = formEditCliente.confirmaSenha.value;
    var confirSenha  = formEditCliente.senha.value;
    var tamanhoSenha = formEditCliente.senha.value;

    if(tamanhoSenha.length < 8){
        alert("Insira uma senha de no mínimo 8 caracteres!");
        return false;
    }

    if(senha != confirSenha){
        alert("Senhas Diferentes!");
        return false;
    }

    if(senha == confirSenha && tamanhoSenha.length >= 8){
        alert("Dados alterados com sucesso !");
        return true;
    }
}

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
    }else{
      limpa_formulário_cep();
      alert("Formato de CEP inválido.");
    }
  }
  else {
    limpa_formulário_cep();
  }
};

$(document).ready(() => {
  $('#cep').mask("00000-000");

  $('#telefone').mask("(00)0000-0000");

  $('#celular').mask('(33)00000-0000');
});
  