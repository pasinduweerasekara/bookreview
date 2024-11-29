// pages/bookdetailspage/BookDetailsPage.js
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./bookdetailspage.css";
import LoginSignup from "../../components/loginsignup/LoginSignup";
import { useUserContext } from "../../context/userContext";
import Spinner from '../../components/spinner/Spinner'
import EditReview from "../../components/editreview/editReview";
import Review from "../../components/review/Review";  // Import Review component
import { AiFillStar } from "react-icons/ai";

const BookDetailsPage = () => {
  const { id } = useParams(); // Get the book id from the URL
  const [book, setBook] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showEditReview, setShowEditReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { currentUser, setCurrentUser } = useUserContext();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const bookResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/books/${id}`);
        setBook(bookResponse.data.book);
        setReviews(bookResponse.data.reviews);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBookData();
  }, [refresh]);

  const handleLoginBtnClick = () => {
    setShowLogin(!showLogin);
  };

  const handleAddReview = async () => {
    if (!reviewText.trim()) return alert("Review text cannot be empty!");
    if (rating < 1 || rating > 5) return alert("Rating must be between 1 and 5!");

    try {
      const newReview = { reviewText, rating, userId: currentUser._id, bookId: id };
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/reviews/`, newReview);
      setReviews([response.data, ...reviews]);
      setReviewText("");
      setRating(5);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      setReviews(reviews.filter((review) => review._id !== reviewId));
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/reviews/${reviewId}?bookId=${id}`);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  if (!book) return <Spinner />;

  const currentUserReviews = reviews.filter((review) => review.userId === currentUser?._id);
  const otherReviews = reviews.filter((review) => review.userId !== currentUser?._id);

  return (
    <div className="book-details-page">
      {/* Book Info Section */}
      <div className="book-details">
        <img src={book.coverImage} alt={`image of ${book.title}`} className="book-cover" />
        <div className="book-info">
          <h1 className="book-title">{book.title}</h1>
          <h2 className="book-author">by {book.author}</h2>
          <p className="book-description">{book.description}</p>
          <div className="book-rating">
            <AiFillStar className="star-icon" />
            <span>{book.averageRating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h3>Reviews</h3>

        {/* Current User's Reviews */}
        {currentUserReviews.length > 0 && (
          <div>
            <h4>By You</h4>
            {currentUserReviews.map((review) => (
              <Review
                key={review._id}
                review={review}
                onDelete={handleDeleteReview}
                isCurrentUser={true}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            ))}
          </div>
        )}

        {/* Other Users' Reviews */}
        <h4>By Others</h4>
        {otherReviews.length > 0 ? (
          otherReviews.map((review) => (
            <Review
              key={review._id}
              review={review}
              onEdit={() => setShowEditReview(true)}  // you can pass an edit handler if necessary
              onDelete={handleDeleteReview}
              isCurrentUser={false}

            />
          ))
        ) : (
          <p>No reviews by others yet!</p>
        )}
      </div>

      {/* Add Review Section */}
      <div className="add-review-section">
        {currentUser ? (
          <>
            <h3>Add Your Review</h3>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              className="review-input"
            />
            <div className="rating-input">
              <label htmlFor="rating">Rating:</label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[5, 4, 3, 2, 1].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <button className="submit-review-btn" onClick={handleAddReview}>
              Submit Review
            </button>
          </>
        ) : (
          <button className="login-btn" onClick={handleLoginBtnClick}>
            Login to Add Review
          </button>
        )}
        {showLogin && <LoginSignup setShowLogin={setShowLogin} setUser={setCurrentUser} />}
        {showEditReview && <EditReview setShowEditReview={setShowEditReview} />}
      </div>
    </div>
  );
};

export default BookDetailsPage
