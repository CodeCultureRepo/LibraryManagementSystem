// server.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const connection = require('../db/connection.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM Info_User WHERE UserName = ? AND Password = ?';
    connection.query(query, [username, password], (err, results) => {
        if (err) {
            res.status(500).send('Error connecting to the database.');
            return;
        }

        if (results.length > 0) {
            req.session.user = { username };
            res.redirect('/account.html'); // Redirect to account page after successful login
        } else {
            res.send('Invalid username or password.');
        }
    });
});

// Endpoint to check if user is logged in
app.get('/login-status', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});

// Route protection middleware
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next(); // User is authenticated, proceed to the next handler
    } else {
        res.redirect('/login.html'); // Redirect to login page if not authenticated
    }
}

// Apply authentication check for the account page
app.get('/account.html', isAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/public/account.html');
});

// Logout endpoint
app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/index.html');
    });
});

// Register endpoint (existing code)
app.post('/register', (req, res) => {
    const { first_name, last_name, username, password } = req.body;

    const query = 'INSERT INTO Info_User (Name, LastName, UserName, Password) VALUES (?, ?, ?, ?)';
    connection.query(query, [first_name, last_name, username, password], (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send('Error registering the user.');
            return;
        }
        res.send('Registration successful!');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
