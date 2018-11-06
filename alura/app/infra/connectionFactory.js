let mysql = require('mysql');

function createDBConnection () {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'casadocodigo_nodejs'
    });
}

module.exports = () => {
    return createDBConnection;
}
