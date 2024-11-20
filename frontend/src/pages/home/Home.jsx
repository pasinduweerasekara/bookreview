import React, { useEffect, useState } from 'react'
import "./home.css"
import axios from 'axios';
import CardGallery from '../../components/productgallery/cardGallery';
const Home = () => {
  const [books, setBooks] = useState([])
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        // Fetch book details and reviews from the database
        const booksResponse = await axios.get(`http://localhost:5000/books`);
        setBooks(booksResponse.data);

      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBookData();
    
  }, []);


  return (
    <div className='home-container'>
      <h1> Books </h1>
      <CardGallery cardsSet={books}/>
    </div>
  )
}

export default Home
