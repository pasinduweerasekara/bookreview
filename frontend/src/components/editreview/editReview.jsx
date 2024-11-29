import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';
import './editreview.css';

const EditReview = ({ review, onClose, refresh, setRefresh }) => {
  const [reviewText, setReviewText] = useState(review.reviewText);
  const [rating, setRating] = useState(review.rating);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setReviewText(review.reviewText);
    setRating(review.rating);
  }, [review]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!reviewText.trim()) {
      alert("Review text cannot be empty!");
      return;
    }

    if (rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5!");
      return;
    }

    setLoading(true);

    try {
      const updatedReview = {
        reviewText,
        rating,
      };

      // Send updated review data to the backend
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/reviews/${review._id}`,
        updatedReview
      );

      // Close the modal or exit edit mode
      onClose();

    } catch (error) {
      console.error('Error updating review:', error);
      alert('Failed to update review. Please try again.');
    } finally {
        setRefresh(!refresh)
      setLoading(false);
    }
  };

  return (
    <div className="edit-review-modal" onClick={onClose}>
      <div className="edit-review-container" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Your Review</h2>
        <form onSubmit={handleEditSubmit}>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Edit your review here..."
            className="review-textarea"
            rows="5"
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

          <div className="edit-review-actions">
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Updating...' : 'Submit Changes'}
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReview;
