const mongoose = require("mongoose");
const Book = require('../models/bookModel')

// Define the Review schema
const reviewSchema = new mongoose.Schema(
    {
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",  // Reference to the Book model
            required: [true, "Book ID is required"],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",  // Reference to the User model
            required: [true, "User ID is required"],
        },
        rating: {
            type: Number,
            required: [true, "Rating is required"],
            min: [1, "Rating must be between 1 and 5"],
            max: [5, "Rating must be between 1 and 5"],
        },
        reviewText: {
            type: String,
            required: [true, "Review text is required"],
            maxlength: [1000, "Review text cannot exceed 1000 characters"],
        },
        dateAdded: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);
//  Calculate average review
const calculateAverageRating = async (bookId) => {
    const reviews = await Review.find({ bookId });
    
    if (reviews.length === 0) {
      return 0;
    }
  
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    
    return isNaN(averageRating)? 0:averageRating
  };

  reviewSchema.post("save", async function () {
    const book = await Book.findById(this.bookId);
    if (book) {
      const averageRating = await calculateAverageRating(this.bookId);
      book.averageRating = averageRating;
      await book.save();
    }
  });
  
  reviewSchema.post("findOneAndDelete", async function (doc) {

    if(doc){
    const book = await Book.findById(doc.bookId);

    if (book) {
      const averageRating = await calculateAverageRating(doc.bookId);
      book.averageRating = averageRating;
      
      await book.save(); // Save the updated book document
    }
  }
  });
  

// Create and export the Review model
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
