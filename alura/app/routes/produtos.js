module.exports = (app) => {
    app.get('/produtos', (request, response, next) => {
        let connection = app.infra.connectionFactory();
        let produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista((err, results) => {
            if (err) return next(err);
            response.format({
                html: () => {
                    response.render('produtos/lista', { lista: results });
                },
                json: () => {
                    response.json(results);
                }
            });            
        });

        connection.end();
    });

    app.get('/produtos/form', (request, response) => {
        response.render('produtos/form', { errosValidacao: null, produto: {} });
    });

    app.post('/produtos', (request, response) => {
        let produto = request.body;

        request.assert('titulo', 'Titulo é obrigatório').notEmpty();
        request.assert('preco', 'Formato de número inválido').isFloat();

        let erros = request.validationErrors();
        if (erros) {
            return response.format({
                html: () => {
                    response.status(400).render('produtos/form', { errosValidacao: erros, produto });
                },
                json: () => {
                    response.status(400).json(erros);
                }
            });
        }

        let connection = app.infra.connectionFactory();
        let produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.salva(produto, (erros, resultados) => {
            response.redirect('/produtos');
        });
    });
}
