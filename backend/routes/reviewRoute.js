const express = require("express");
const router = express.Router();
const {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
} = require("../controllers/reviewController");

// GET /reviews: Retrieve all book reviews
router.get("/", getReviews);

// GET /reviews/:id: Retrieve a specific review by ID
router.get("/:id", getReviewById);

// POST /reviews: Create a new book review
router.post("/", createReview);

// PUT /reviews/:id: Update an existing review by ID
router.put("/:id", updateReview);

// DELETE /reviews/:id: Delete a specific review by ID
router.delete("/:id", deleteReview);

module.exports = router;
