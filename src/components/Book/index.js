import React, { useContext } from "react";
import PropTypes from "prop-types";
import BookDropDown from "./BookDropDown";
import { useDrag } from "react-dnd";
import AppContext from "../../Context";

const Book = (props) => {
  const { bookObject } = props;
  const {
    imageLinks: { smallThumbnail },
    title,
    authors,
    publisher
  } = bookObject;

  const getAuthorsOrPublisher = () => {
    if (authors) {
      return authors.length > 1 ? authors.join(", ") : authors[0]
    }
    if (publisher) {
      return publisher
    }
    return 'UNKNOWN'
  }

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
          <BookDropDown bookObject={bookObject} />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">
          {getAuthorsOrPublisher()}
        </div>
      </div>
  );
};

Book.propTypes = {
  bookObject: PropTypes.object.isRequired,
};

export const DraggableBook = ({ bookObject }) => {
  const { updateBooks } = useContext(AppContext);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "Book",
    item: { bookId: bookObject.id, updateBooks },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
      }}
    >
      <Book bookObject={bookObject} />
    </div>
  );
};
export default Book;