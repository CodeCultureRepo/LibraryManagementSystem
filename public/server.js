// server.js
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../db/connection.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Login endpoint (existing code)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Query to check user credentials
    const query = 'SELECT * FROM Info_User WHERE UserName = ? AND Password = ?';
    connection.query(query, [username, password], (err, results) => {
        if (err) {
            res.status(500).send('Error connecting to the database.');
            return;
        }

        if (results.length > 0) {
            res.send('Login successful!');
        } else {
            res.send('Invalid username or password.');
        }
    });
});

// New register endpoint
app.post('/register', (req, res) => {
    const { first_name, last_name, username, password } = req.body;

    const query = 'INSERT INTO Info_User (Name, LastName, UserName, Password) VALUES (?, ?, ?, ?)';
    connection.query(query, [first_name, last_name, username, password], (err, results) => {
        if (err) {
            console.error("Error executing query:", err); // Log the error details
            res.status(500).send('Error registering the user.');
            return;
        }
        res.send('Registration successful!');
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
