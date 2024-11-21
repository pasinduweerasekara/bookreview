const Review = require("../models/reviewModel");
const Book = require("../models/bookModel");

// Get all reviews
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate("bookId", "title author genre")  // Populate book details
            .populate("userId", "name email");         // Populate user details
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get review by ID
const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate("bookId", "title author genre")
            .populate("userId", "name email");
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new review
const createReview = async (req, res) => {
    const { bookId, userId, rating, reviewText } = req.body;

    try {
        // Check if the book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Create a new review
        const review = new Review({ bookId, userId, rating, reviewText });

        // Save the review
        const newReview = await review.save();

        // Optionally, you can update the average rating of the book after the review is created
        const reviews = await Review.find({ bookId });
        const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
        book.averageRating = averageRating;
        await book.save();

        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing review by ID
const updateReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a review by ID
const deleteReview = async (req, res) => {
    const {bookId} = req.query 
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
};
