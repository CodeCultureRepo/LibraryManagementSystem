const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db/connection');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Endpoint to add a book
app.post('/addBook', (req, res) => {
    const { title, author } = req.body;
    const query = 'INSERT INTO books (title, author, is_available) VALUES (?, ?, true)';
    connection.query(query, [title, author], (err, result) => {
        if (err) throw err;
        res.send('Book added successfully!');
    });
});

// Endpoint to return a book and calculate fine
app.post('/returnBook', (req, res) => {
    const { user_id, book_id } = req.body;
    const today = new Date();
    
    const query = 'SELECT due_date FROM borrows WHERE user_id = ? AND book_id = ? AND return_date IS NULL';
    connection.query(query, [user_id, book_id], (err, results) => {
        if (err) throw err;
        
        const dueDate = new Date(results[0].due_date);
        const fine = (today > dueDate) ? ((today - dueDate) / (1000 * 60 * 60 * 24)) * 5 : 0;

        // Update the record
        const updateQuery = 'UPDATE borrows SET return_date = ?, fine = ? WHERE user_id = ? AND book_id = ?';
        connection.query(updateQuery, [today, fine, user_id, book_id], (err, result) => {
            if (err) throw err;
            res.send(`Book returned! Fine: $${fine.toFixed(2)}`);
        });
    });
});
