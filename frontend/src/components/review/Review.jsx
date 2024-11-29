// components/review/Review.js
import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import "./Review.css";
import EditReview from "../editreview/editReview";

const Review = ({ review, onDelete,setRefresh,refresh, isCurrentUser }) => {
    
    const [showEdit, setShowEdit] = useState(false)

    const onEdit = () =>{
        setShowEdit(true)
    }
    
  return (
    <div className="review-card">
      <div className="review-rating">
        <AiFillStar className="star-icon" />
        {review.rating}
      </div>
      <p className="review-text">{review.reviewText}</p>
      {isCurrentUser && (
        <div className="review-actions">
          <span className="edit-btn" onClick={onEdit}>
            Edit
          </span>
          <button className="delete-btn" onClick={() => onDelete(review._id)}>
            Delete
          </button>
        </div>
      )}
      {!isCurrentUser && <p className="review-author">- {review.userName}</p>}
      {showEdit?<EditReview setRefresh={setRefresh} refresh={refresh} review={review} onClose={()=>setShowEdit(false) }/>:""}
    </div>
  );
};

export default Review;
