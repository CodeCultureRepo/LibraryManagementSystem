// server.js
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../db/connection.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Query to check user credentials
    const query = 'SELECT * FROM Info_Users WHERE UserName = ? AND Password = ?';
    connection.query(query, [username, password], (err, results) => {
        if (err) {
            res.status(500).send('Error connecting to the database.');
            return;
        }

        // Check if any user matched the credentials
        if (results.length > 0) {
            res.send('Login successful!');
        } else {
            res.send('Invalid username or password.');
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
