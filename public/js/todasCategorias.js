// REQUISIÇÃO PARA LISTAR TODAS AS CATEGORIAS
var requisicaoCategorias = (url) => {

    let ajax = new XMLHttpRequest();

    ajax.open('GET', url);

    ajax.onreadystatechange = () =>{
        if(ajax.readyState == 4 && ajax.status == 200){
            document.getElementById('todasCategorias').innerHTML = ajax.responseText;
        }
    }
    
    ajax.send();
}