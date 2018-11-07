// Para ter a mesma versão sempre, separar a execução do retorno.
let express = require('express');
let load = require('express-load');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');

module.exports = () => {
    let app = express();
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(express.static('./app/public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(expressValidator());

    // Aqui, 'routes' é o nome da pasta que contém o código a ser carregado. O 'cwd' otimiza a
    // busca do express-load, falando qual é a pasta raiz de onde ele deve buscar os módulos a
    // serem carregados. É uma configuração global, e não precisa ser refeita no 'then'. A ordem
    // aqui é importante, precisamos carregar a rota antes, porque as rotas tem uma dependência
    // da infra, que vem depois.
    load('routes', { cwd: 'app' })
        // Aqui, tudo que os arquivos da pasta 'infra' exportam se tornam objetos/funções
        // com o mesmo nome do arquivo, dentro de infra.app, como app.infra.connectionFactory.
        .then('infra')
        .into(app);

    return app;
}
