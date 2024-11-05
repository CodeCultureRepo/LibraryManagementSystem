const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'abigails',
    password: 'G0ldenSpringEngineering!',
    database: 'library_management'
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the MySQL database!");
});

module.exports = connection;
