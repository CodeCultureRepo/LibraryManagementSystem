const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'abigails',
    password: 'G0ldenSpringEngineering!',
    database: 'library_management'
});

// connection.js
connection.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.stack);
        return;
    }
    console.log("Connected to the MySQL database!");
});

module.exports = connection;
