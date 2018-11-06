var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutosController', function () {
    beforeEach(function (done) {
        var conn = express.infra.connectionFactory();
        conn.query('delete from livros', function (err) {
            if (!err) done();
            else console.log(err);
        });
    });

    it('#listagem json', function (done) {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('#cadastro de novo produto com dados invalidos', function (done) {
        request.post('/produtos')
            .send({titulo:'',descricao:'novo livro'})
            .expect(400, done);
    });

    it('#cadastro de novo produto com dados invalidos', function (done) {
        request.post('/produtos')
            .send({titulo:'novo',descricao:'novo livro',preco:20.50})
            .expect(302, done);
    });
});