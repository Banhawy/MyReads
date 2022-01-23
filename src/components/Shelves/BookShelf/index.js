import React, { useContext } from "react";
import PropTypes from "prop-types";
import AppContext from "../../../Context";
import { DraggableBook } from "../../Book";
import { useDrop } from "react-dnd";

const BookShelf = ({ shelfName }) => {
  const { books } = useContext(AppContext);
  let backgroundColor = "white"

  const [{ isOver, isOverCurrent }, drop] = useDrop(() => ({
    accept: "Book",
    drop(item) {
      const { bookId, updateBooks } = item;
      updateBooks(bookId, shelfName);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }));

  if (isOverCurrent || isOver) {
    backgroundColor = '#cdfca5'
  }

  const booksInThisShelf = books.filter((book) => book.shelf === shelfName);
  const listBooksInShelf = booksInThisShelf.map((book) => (
    <li key={book.id}>
      <DraggableBook bookObject={book} />
    </li>
  ));

  return (
    <div style={{ backgroundColor }} ref={drop} className="bookshelf-books">
      <ol className="books-grid">
        {booksInThisShelf.length > 0 ? listBooksInShelf : "Empty..."}
      </ol>
    </div>
  );
};

BookShelf.propTypes = {
  shelfName: PropTypes.string.isRequired,
};

export default BookShelf;
