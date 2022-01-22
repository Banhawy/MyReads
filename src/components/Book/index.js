import React from "react";
import PropTypes from 'prop-types';
import BookDropDown from './BookDropDown'

const Book = (props) => {
  const { bookObject } = props
  const { imageLinks: { smallThumbnail }, title, authors } = bookObject
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${smallThumbnail})`,
          }}
        ></div>
        <BookDropDown bookObject={bookObject}/>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors.length > 1 ? authors.join(', ') : authors[0]}</div>
    </div>
  );
};

Book.propTypes = {
  bookObject: PropTypes.object.isRequired,
}

export default Book;
