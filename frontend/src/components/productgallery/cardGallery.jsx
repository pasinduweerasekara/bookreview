import React, { useState, useEffect } from 'react';
import './cardgallery.css'; // Import your CSS file if needed
import BookReviewCard from '../bookreviewcard/bookReviewCard'

const CardGallery = ({ cardsSet }) => {
  
  return (
    <div id="card-container">
      <div className="card-internal-container" id="internal-container-id">
        
        {
          
          (cardsSet.length!=0)?
          cardsSet.map(card => (<BookReviewCard book={card} key={card._id}/>))
      :
          <div  className="card show" id="">
                <p>Empty</p>
              </div>

        }
        
      </div>
    </div>
  );
};

export default CardGallery;
