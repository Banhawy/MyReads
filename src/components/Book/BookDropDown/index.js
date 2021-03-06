import React, { useContext } from "react";
import PropTypes from "prop-types";
import AppContext from "../../../Context";

const BookDropDown = (props) => {
  const { updateBooks } = useContext(AppContext);
  return (
    <div className="book-shelf-changer">
      <select
        onChange={(e) => updateBooks(props.bookObject, e.target.value)}
        value={props.bookObject.shelf ? props.bookObject.shelf : "none"}
      >
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None (Remove)</option>
      </select>
    </div>
  );
};

BookDropDown.propTypes = {
    bookObject: PropTypes.object.isRequired,
};

export default BookDropDown;
