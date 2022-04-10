const express      = require('express');
const app          = express();
const bodyParser   = require('body-parser');
const connection   = require('./database/database');
const session      = require('express-session');
const flash        = require('express-flash');
const cookieParser = require('cookie-parser');

app.use(cookieParser("sfsdajjfajofjsaiofjdskjfdksjfodskç"));

// CRIANDO SESSÃO PARA USUÁRIOS
app.use(session({
    secret: "hohsoihdiosoasjcodsjciojsdiofhufheuifhruifheiuhuiasad",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 600000}
}));

app.use(flash());

//-----------------------  ROTAS IMPORTADAS
const painelController    = require('./Dashboard/dashboardControllers');
const servicosController  = require('./Servico/ServicoController');
const categoriaController = require('./Categoria/CategoriaControllers');
const adminController     = require('./Administrador/AdminControllers');
const postController      = require('./Postagem/PostagemController');
const userController      = require('./Usuario/UserController');

//-----------------------  CONEXÃO COM O BANCO DE DADOS
connection.authenticate()
    .then(() => {
        console.log("Conexao feita com sucesso");
    })
    .catch(erro => {
        console.log(erro);
    })
//-----------------------  FIM DA CONEXÃO COM O BANCO DE DADOS


//-----------------------  EXTENSÃO USADAS PARA A CRIAÇÃO
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//-----------------------  FIM DAS EXTENSÃO USADAS PARA A CRIAÇÃO

app.use('/', painelController);
app.use('/', servicosController);
app.use('/', categoriaController);
app.use('/', adminController);
app.use('/', postController);
app.use('/', userController);

const port = process.env.PORT || 8080;

app.listen(port, (erro) => {
    if (erro)
    {
        console.log("ERRO!");
    }
});