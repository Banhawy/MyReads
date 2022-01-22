import React from "react";
import AddBook from "../AddBook";
import Header from "../Header";
import Shelves from "../Shelves";

const Main = () => (
  <div className="list-books">
    <Header />
    <Shelves />
    <AddBook />
  </div>
);

export default Main;
