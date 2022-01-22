import React from "react";
import PropTypes from 'prop-types';
import BookDropDown from './BookDropDown'
const Book = (props) => {
  const { backgroundImageUrl, title, authors, shelf } = props
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${backgroundImageUrl})`,
          }}
        ></div>
        <BookDropDown />
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  );
};

Book.propTypes = {
  backgroundImageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired
}

export default Book;
