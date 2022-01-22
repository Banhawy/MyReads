import React from "react";
import BookShelf from "./BookShelf";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Shelves = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <BookShelf shelfName="currentlyReading" />
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <BookShelf shelfName="wantToRead" />
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <BookShelf shelfName="read" />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Shelves;
