import React, { useEffect, useState } from 'react'
import "./home.css"
import axios from 'axios';
import CardGallery from '../../components/productgallery/cardGallery';

import img1 from "../../assets/walkintotheshadow.webp"
import img2 from "../../assets/thebookofart.jpg"
import img3 from "../../assets/windblownshadows.jpg"
import img4 from "../../assets/thewitcher.jpg"
import img5 from "../../assets/lordoftherings.jpg"
import img6 from "../../assets/onepiece.jpg"
import img7 from "../../assets/memory.jpg"
import img8 from "../../assets/finalpatrol.jpg"

const images = [img1,img2,img3,img4,img5,img6,img7,img8]
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
      <CardGallery cardsSet={books} images={images}/>
    </div>
  )
}

export default Home
