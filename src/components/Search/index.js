import React, { useState, useCallback, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import { search } from "../../BooksAPI";
import Book from "../Book";
import AppContext from "../../Context";
import { BallTriangle } from "react-loader-spinner";

const Search = () => {
  const { books } = useContext(AppContext);
  const [query, setQuery] = useState("");
  const [filteredBooks, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const doesBookExistInAppState = (bookID) =>
    books.filter((book) => book.id === bookID).length > 0;

  const getShelfFromState = (bookID) =>
    books.find((book) => book.id === bookID).shelf;

  const resetView = () => {
    setBooks([]);
    setIsLoading(false);
  };

  const updateBooks = (bookID, queriedBooks) => {
    const bookToUpdate = queriedBooks.find((book) => book.id === bookID);
    bookToUpdate.shelf = getShelfFromState(bookToUpdate.id);
    const updatedBooks = queriedBooks.map((book) =>
      book.id === bookID ? bookToUpdate : book
    );
    queriedBooks = updatedBooks;
  };

  const scanBooks = (queriedBooks) => {
    if (queriedBooks.error) {
      resetView();
      return;
    }
    const queriedBooksCopy = queriedBooks;
    const existingBooks = queriedBooks
      ? queriedBooks.filter((book) => doesBookExistInAppState(book.id))
      : [];

    if (existingBooks.length > 0) {
      existingBooks.forEach((book) => {
        updateBooks(book.id, queriedBooksCopy);
      });
    }
    setBooks(queriedBooksCopy);
    setIsLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchApi = (query) => {
    search(query)
      .then((books) => scanBooks(books))
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };
  
  const debounceAndSearch = useCallback(
    debounce((nextValue) => searchApi(nextValue), 2000),
    [searchApi]
  );

  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    setIsLoading(true);
    value ? debounceAndSearch(value) : resetView();
  };

  useEffect(() => {
    const updateBooks = (bookID, searchStateBooks) => {
      const bookToUpdate = searchStateBooks.find((book) => book.id === bookID);
      bookToUpdate.shelf = getShelfFromState(bookToUpdate.id);
      const updatedBooks = searchStateBooks.map((book) =>
        book.id === bookID ? bookToUpdate : book
      );
      searchStateBooks = updatedBooks;
    };

    const doesBookExistInSearchState = (bookID) =>
      filteredBooks.filter((book) => book.id === bookID).length > 0;

    const existingFilteredBooks = books.filter((book) =>
      doesBookExistInSearchState(book.id)
    );

    const updateSearchStateBooks = () => {
      const filteredBooksCopy = [...filteredBooks];
      existingFilteredBooks.forEach((book) => {
        updateBooks(book.id, filteredBooksCopy);
      });
      setBooks(filteredBooksCopy);
    };

    if (existingFilteredBooks.length > 0) {
      updateSearchStateBooks();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input
            onChange={handleChange}
            value={query}
            type="text"
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {isLoading ? (
            <BallTriangle
              height="100"
              width="100"
              color="grey"
              ariaLabel="loading"
            />
          ) : (
            <>
              {filteredBooks.length < 1 && <p>No books to show...</p>}
              {filteredBooks.map((book) => (
                <li key={book.id}>
                  <Book bookObject={book} />
                </li>
              ))}
            </>
          )}
        </ol>
      </div>
    </div>
  );
};

export default Search;
