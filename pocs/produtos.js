const http = require('http');

http.createServer((request, response) => {
    if (request.url === '/produtos') {
        response.end('<html><body><h1>Listando os produtos</h1></body></html>');
    } else {
        response.end('<html><body>Home</body></html>');
    }
}).listen(3000, 'localhost');

console.log('Servior rodando');
