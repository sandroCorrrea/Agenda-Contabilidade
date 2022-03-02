// AQUI EU VOU FAZER A REQUISIÇÃO ENTRE PÁGINAS VIA AJAX
var requisicaoPagina = (url) => {

    let ajax = new XMLHttpRequest();

    ajax.open('get', url);

    ajax.onreadystatechange = () =>{
        if(ajax.readyState == 4 && ajax.status == 200){
            document.getElementById('categoriaServico').innerHTML = ajax.responseText;
        }
    };
    ajax.send();
}