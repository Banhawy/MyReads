import React, { useContext } from "react";
import PropTypes from 'prop-types';
import AppContext from "../../../Context";
import Book from "../../Book";

const BookShelf = ({ shelfName }) => {
    const { books } = useContext(AppContext);
    const booksInThisShelf = books.filter(book => book.shelf === shelfName)
    const listBooks = booksInThisShelf.map(
        book => (
        <li key={book.id}>
            <Book bookObject={book}/>
        </li>
            )
        )
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {booksInThisShelf.length > 0  ? listBooks : 'Empty...'}
      </ol>
    </div>
  );
};

BookShelf.propTypes = {
    shelfName: PropTypes.string.isRequired
}

export default BookShelf;
