var confirmaSolicitacao = () => {
    alert("Recebemos seu Suporte entraremos em contato !");
}

$(document).ready(() => {
    //CRIANDO MASCARA PARA OS CAMPOS
    $('#celular').mask('(00)00000-0000');
    $('#telefone').mask('(00)0000-0000');
});