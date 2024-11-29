import "./bookReviewCard.css";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const BookReviewCard = ({book, image}) => {
  
    
  const navigate = useNavigate();

  // Navigate to the book's detail page
  const handleClick = () => {
    navigate(`/books/${book._id}`);
  };

  return (
    <div className="book-card">
      {/* Image and rating */}
      <div className="book-img-container" onClick={handleClick}>
        <img src={image} alt={`cover image of ${book.title}`} className="book-img" />
        <div className="rating">
          <AiFillStar className="star-icon" />
          {book.averageRating.toFixed(1)}
        </div>
      </div>

      {/* Title and author */}
      <div className="book-content" onClick={handleClick}>
        <span className="title">{book.title}</span>
        <span className="author">by {book.author}</span>
      </div>

      {/* View button */}
      <button className="book-btn" onClick={handleClick}>
        VIEW
      </button>
    </div>
  );
};

export default BookReviewCard;
