const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(bodyParser.json());

let books = [];
let reviews = [];
const BOOK_DATA_FILE = './books.json';
const REVIEW_DATA_FILE = './reviews.json';

// Load data if files exist
if (fs.existsSync(BOOK_DATA_FILE)) {
    books = JSON.parse(fs.readFileSync(BOOK_DATA_FILE, 'utf8'));
}

if (fs.existsSync(REVIEW_DATA_FILE)) {
    reviews = JSON.parse(fs.readFileSync(REVIEW_DATA_FILE, 'utf8'));
}

app.get('/books', (req, res) => {
    res.json(books);
});

app.post('/books', (req, res) => {
    const newBook = {
        id: Date.now(),
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    fs.writeFileSync(BOOK_DATA_FILE, JSON.stringify(books));
    res.json(newBook);
});

app.get('/reviews', (req, res) => {
    res.json(reviews);
});

app.post('/reviews', (req, res) => {
    const newReview = {
        bookId: req.body.bookId,
        userId: req.body.userId,
        rating: req.body.rating,
        review: req.body.review
    };
    reviews.push(newReview);
    fs.writeFileSync(REVIEW_DATA_FILE, JSON.stringify(reviews));
    res.json(newReview);
});

// Here, you can add routes to fetch recommended books.

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
