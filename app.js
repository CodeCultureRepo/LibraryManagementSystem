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


// Endpoint to fetch all books
app.get('/books', (req, res) => {
    const query = 'SELECT title, author, publisher, is_available, cover_image FROM books';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// app.js

// Endpoint to add a new book
app.post('/addBook', (req, res) => {
    const { title, author, publisher, is_available } = req.body;
    const query = 'INSERT INTO info_books (title, author, publisher, availablility) VALUES (?, ?, ?, ?)';
    connection.query(query, [title, author, publisher, is_available], (err, result) => {
        if (err) return res.status(500).send("Error adding book.");
        res.send("Book added successfully!");
    });
});

// Endpoint to delete a book by title
app.delete('/deleteBook', (req, res) => {
    const title = req.query.title;
    const query = 'DELETE FROM info_books WHERE title = ?';
    connection.query(query, [title], (err, result) => {
        if (err) return res.status(500).send("Error deleting book.");
        if (result.affectedRows === 0) return res.send("Book not found.");
        res.send("Book deleted successfully!");
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
