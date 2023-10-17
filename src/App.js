import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from './components/Book';

function App() {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await axios.get('http://localhost:5000/books');
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        }

        fetchBooks();
    }, []);

    const addBook = async () => {
        try {
            const response = await axios.post('http://localhost:5000/books', {
                title,
                author
            });
            setBooks([...books, response.data]);
            setTitle("");
            setAuthor("");
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    return (
        <div className="App">
            <h1>Book Recommendation System</h1>
            
            <div>
                <input 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Book title"
                />
                <input 
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    placeholder="Author"
                />
                <button onClick={addBook}>Add Book</button>
            </div>

            {books.map(book => (
                <Book key={book.id} book={book} />
            ))}
        </div>
    );
}

export default App;
