module.exports = (app) => {
    app.get('/promocoes/form', (request, response, next) => {
        let connection = app.infra.connectionFactory();
        let produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista((err, results) => {
            if (err) return next(err);
            response.render('promocoes/form', { lista: results });
        });

        connection.end();
    });

    app.post('/promocoes', (request, response, next) => {
        let promocao = request.body;
        console.log(promocao);
        response.redirect('promocoes/form');
    });
}