// Para ter a mesma versão sempre, separar a execução do retorno.
let express = require('express');
let load = require('express-load');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');

module.exports = () => {
    let app = express();
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(expressValidator());

    load('routes', { cwd: 'app' })
        // Aqui, tudo que os arquivos da pasta infra exportam se tornam objetos/funções
        // com o mesmo nome do arquivo, dentro de infra.app, como app.infra.connectionFactory.
        .then('infra')
        .into(app);

    return app;
}
