let app = require('./config/express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.set('io', io);

let porta = process.env.PORT || 3000;
http.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}.`);
});
