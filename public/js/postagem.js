const date = new Date();

var validaPublicacao = () =>{
    var dataInicio = publicacao.dataInicio.value;
    var dataFim    = publicacao.dataFim.value;

    if(dataFim != "" && dataInicio == ""){
        alert("Preencha as Duas Datas!");
        return false;
    }
    if (dataInicio > dataFim ){
        alert("Data Início Maior Que Data Fim !");
        return false;
    }else if (dataFim < dataInicio){
        alert("Data Fim Maior que Data Início !")
        return false;
    }
    else{
        return true;
    }
};