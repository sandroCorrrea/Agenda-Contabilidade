var validaSenha = () => {
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
}
var confirmFormulario = () =>{
    alert("Dados alterados com sucesso !");
}