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
    BooksAPI.getAll()
      .then((data) => setBooks(data));
  }, []);

  const updateBooks = (bookID, shelfChange) => {
    const bookToUpdate = books.find(book => book.id === bookID)
    bookToUpdate.shelf = shelfChange
    const updatedBooks = books.map(book => book.id === bookID ? bookToUpdate : book)
    setBooks(updatedBooks)
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
