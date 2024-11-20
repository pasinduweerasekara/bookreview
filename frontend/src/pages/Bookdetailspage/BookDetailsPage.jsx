import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";
import "./bookdetailspage.css";
import LoginSignup from "../../components/loginsignup/LoginSignup";
import { useUserContext } from "../../context/userContext";

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

  if (currentUser) {
    setCurrentUser(currentUser)
  }else setCurrentUser(null)
  }, [user])
  
  
  useEffect(()=>{
    setCurrentUser({id: "u1",
    name: "John Doe", 
    email: "johndoe@example.com", })
    setCurrentUser(null)

    setReviews([
        {
          id: "r1", // Unique identifier for the review
          text: "A timeless masterpiece that offers insight into the American experience. The prose is beautiful and the story is poignant.",
          rating: 5, // Review rating (e.g., 5 out of 5)
          userName: "John Doe", // The name of the reviewer
          userId: "u1", // The ID of the reviewer (user)
        },
        {
          id: "r2",
          text: "A bit overrated for me. The story is slow in parts, but the writing is undeniably brilliant. Still a must-read.",
          rating: 4,
          userName: "Jane Smith",
          userId: "u2",
        },
        {
          id: "r3",
          text: "Not my cup of tea. I struggled to connect with the characters, and the plot felt shallow.",
          rating: 2,
          userName: "Alice Johnson",
          userId: "u3",
        },
      ])
  },[])

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        // Fetch book details and reviews from the database
        const bookResponse = await axios.get(`http://localhost:5000/books/${id}`);
        setBook(bookResponse.data);
        

        // Fetch current user (simulated by fetching from a session/token)
        const userResponse = await axios.get("/api/auth/current-user");
        setCurrentUser(userResponse.data.user);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBookData();
  }, [id]);

  const handleLoginBtnClick = ()=>{
    setShowLogin(!showLogin)
  }

  // Add a new review
  const handleAddReview = async () => {
    if (!reviewText.trim()) return alert("Review text cannot be empty!");
    if (rating < 1 || rating > 5) return alert("Rating must be between 1 and 5!");

    try {
      const newReview = {
        text: reviewText,
        rating,
        userId: currentUser.id,
      };

      const response = await axios.post(`/api/books/${id}/reviews`, newReview);
      setReviews([response.data.review, ...reviews]); // Add the new review to the top
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
      await axios.delete(`/api/reviews/${reviewId}`);
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  if (!book) return <div>Loading...</div>;

  // Separate current user's reviews from others
  const currentUserReviews = reviews.filter((review) => review.userId === currentUser?.id);
  const otherReviews = reviews.filter((review) => review.userId !== currentUser?.id);

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
              <div key={review.id} className="review-card">
                <div className="review-rating">
                  <AiFillStar className="star-icon" />
                  {review.rating}
                </div>
                <p className="review-text">{review.text}</p>
                <div className="review-actions">
                  <button className="edit-btn" onClick={() => handleEditReview(review.id)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteReview(review.id)}>
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
            <div key={review.id} className="review-card">
              <div className="review-rating">
                <AiFillStar className="star-icon" />
                {review.rating}
              </div>
              <p className="review-text">{review.text}</p>
              <p className="review-author">- {review.userName}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review this book!</p>
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
        {showLogin?<><LoginSignup setShowLogin={setShowLogin} setUser={setCurrentUser}/><div id="lightbox" onClick={handleLightboxClick}></div></>:""}
      </div>
      
    </div>
  );
};

export default BookDetailsPage;
