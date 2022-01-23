import React, { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import AppContext from "./Context";
import { Route, Switch } from "react-router-dom";
import Search from "./components/Search";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

const BooksApp = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((data) => setBooks(data));
  }, []);

  const addNewBookToState = (newBook, shelf) => {
    newBook.shelf = shelf;
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
  };

  const updateExistingBook = (bookToUpdate, shelf) => {
    bookToUpdate.shelf = shelf;
    const updatedBooks = books.map((book) =>
      book.id === bookToUpdate.id ? bookToUpdate : book
    );
    setBooks(updatedBooks);
  };

  /**
   * A function that updates the books array in the app's global state
   * @param {Object} bookToChange the book object being added to or updated in the app's state
   * @param {string} shelfChange the new shelf name of to assign to the book
   */
  const updateBooks = async (bookToChange, shelfChange) => {
    let bookToUpdate = books.find((book) => book.id === bookToChange.id);

    if (!bookToUpdate) {
      addNewBookToState(bookToChange, shelfChange);
    } else {
      updateExistingBook(bookToUpdate, shelfChange);
    }

    await BooksAPI.update(bookToChange, shelfChange);
  };

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ books, updateBooks }}>
        <div className="app">
          <Switch>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route exact path="/">
              <Main />
            </Route>
          </Switch>
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
};

export default BooksApp;
