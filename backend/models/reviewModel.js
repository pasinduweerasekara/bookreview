const mongoose = require("mongoose");

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

// Create and export the Review model
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
