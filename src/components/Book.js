import React from 'react';

function Book({ book }) {
    return (
        <div>
            <h2>{book.title}</h2>
            <p>By: {book.author}</p>
        </div>
    );
}

export default Book;
