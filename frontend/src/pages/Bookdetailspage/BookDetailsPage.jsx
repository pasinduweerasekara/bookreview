import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";
import "./bookdetailspage.css";
import LoginSignup from "../../components/loginsignup/LoginSignup";
import { useUserContext } from "../../context/userContext";
import Spinner from '../../components/spinner/Spinner'

const BookDetailsPage = () => {
  const { id } = useParams(); // Get the book id from the URL
  const [book, setBook] = useState(null); // Book details
  const [showLogin, setShowLogin] = useState(false); // Book details
  const [reviews, setReviews] = useState([]); // All reviews
  const [user, setCurrentUser] = useState(null); // Logged-in user
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  const {currentUser} = useUserContext()

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        // Fetch book details and reviews from the database
        const bookResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/books/${id}`);
        setBook(bookResponse.data.book);
        setReviews(bookResponse.data.reviews);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };
  
    fetchBookData();
  }, [id]);


  const memoizedLoginSignup = useMemo(() => {
    return showLogin ? <LoginSignup setShowLogin={setShowLogin} setUser={setCurrentUser} /> : null;
  }, [showLogin, setCurrentUser]);

  const handleLoginBtnClick = ()=>{
    setShowLogin(!showLogin)
  }

  // Add a new review
  const handleAddReview = async () => {
    if (!reviewText.trim()) return alert("Review text cannot be empty!");
    if (rating < 1 || rating > 5) return alert("Rating must be between 1 and 5!");

    try {
      const newReview = {
        reviewText,
        rating,
        userId: currentUser._id,
        bookId:id
      };

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/reviews/`, newReview)
      
      setReviews([response.data, ...reviews]); // Add the new review to the top
      setReviewText("");
      setRating(5);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  // Edit a review
  const handleEditReview = async (reviewId) => {
    const updatedReviewText = prompt(
      "Edit your review:",
      reviews.find((r) => r.id === reviewId)?.text
    );

    if (!updatedReviewText) return;

    try {
      const response = await axios.put(`/api/reviews/${reviewId}`, {
        text: updatedReviewText,
      });

      // Update reviews in state
      setReviews(
        reviews.map((review) =>
          review.id === reviewId ? { ...review, text: response.data.text } : review
        )
      );
    } catch (error) {
      console.error("Error editing review:", error);
    }
  };

  // Delete a review
  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      setReviews(reviews.filter((review) => review._id !== reviewId));
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/reviews/${reviewId}?boodId=${id}`);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  if (!book) return <Spinner/>;

  // Separate current user's reviews from others
  const currentUserReviews = reviews.filter((review) => review.userId === currentUser?._id);
  const otherReviews = reviews.filter((review) => review.userId !== currentUser?._id);

  const handleLightboxClick =() =>{
    setShowLogin(false)
  }
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
              <div key={review._id} className="review-card">
                <div className="review-rating">
                  <AiFillStar className="star-icon" />
                  {review.rating}
                </div>
                <p className="review-text">{review.reviewText}</p>
                <div className="review-actions">
                  <button className="edit-btn" onClick={() => handleEditReview(review._id)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteReview(review._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Other Users' Reviews */}
        <h4>By Others</h4>
        {otherReviews.length > 0 ? (
          otherReviews.map((review) => (
            <div key={review._id} className="review-card">
              <div className="review-rating">
                <AiFillStar className="star-icon" />
                {review.rating}
              </div>
              <p className="review-text">{review.reviewText}</p>
              <p className="review-author">- {review.userName}</p>
            </div>
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
        {memoizedLoginSignup}
        {showLogin?<div id="lightbox" onClick={handleLightboxClick}></div>:""}
      </div>
      
    </div>
  );
};

export default BookDetailsPage;