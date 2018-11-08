let mysql = require('mysql');

function createDBConnection () {
    if (!process.env.NODE_ENV) {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'casadocodigo_nodejs'
        });
    }

    if (process.env.NODE_ENV === 'test') {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'casadocodigo_nodejs_test'
        });
    }

    if (process.env.NODE_ENV === 'production') {
        // Conexão com o banco do Heroku, por exemplo.
        let url = process.env.CLEARDB_DATABASE_URL;
        let grupos = url.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?/);
        return mysql.createConnection({
            host: grupos[3],
            user: grupos[1],
            password: grupos[2],
            database: grupos[4]
        });
    }
}

module.exports = () => {
    return createDBConnection;
}
