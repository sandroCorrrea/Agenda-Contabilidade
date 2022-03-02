var verificaEdicaoSenha = () => {
    alert("Dados alterados com sucesso, verifique as informações novamente!");
}; 

var alteraAdmin = () => {
    alert("Alteração salva com sucesso!");
};

var confirmDeleteCliente = (event) => {
    var option = confirm("EXCLUIR");

    if(option){

    }else{
        event.preventDefault();
    }
};