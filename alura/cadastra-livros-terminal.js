let http = require('http');

let configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/produtos',
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
}

let client = http.request(configuracoes, res => {
    console.log(res.statusCode);
    res.on('data', body => console.log('Corpo: ' + body));
});

let produto = {
    titulo: 'Mais sobre node 2',
    descricao: 'node, javascript e um pouco sobre http',
    preco: 100
};

client.end(JSON.stringify(produto));
