module.exports = (app) => {
    app.get('/', (request, response, next) => {
        let connection = app.infra.connectionFactory();
        let produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista((err, results) => {
            if (err) return next(err);
            response.render('home/index', { livros: results });
        });

        connection.end();
    });
}