import React, { useState, useEffect } from 'react';
import './cardgallery.css'; // Import your CSS file if needed
import BookReviewCard from '../bookreviewcard/bookReviewCard'
import Spinner from '../spinner/Spinner';

const CardGallery = ({ cardsSet,images }) => {
  
  return (
    <div id="card-container">
      <div className="card-internal-container" id="internal-container-id">
        
        {
          
          (cardsSet.length!=0)?
          cardsSet.map((card,index) => (<BookReviewCard book={card} image={images[index]} key={card._id}/>))
      :
          <div  className="card show" id="">
                <Spinner/>
              </div>

        }
        
      </div>
    </div>
  );
};

export default CardGallery;
