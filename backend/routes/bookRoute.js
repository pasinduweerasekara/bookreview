const express = require("express");
const router = express.Router();
const {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
} = require("../controllers/bookController");

// GET /books: Retrieve all books
router.get("/", getBooks);

// GET /books/:id: Retrieve a specific book by ID
router.get("/:id", getBookById);

// POST /books: Create a new book
router.post("/", createBook);

// PUT /books/:id: Update an existing book by ID
router.put("/:id", updateBook);

// DELETE /books/:id: Delete a specific book by ID
router.delete("/:id", deleteBook);

module.exports = router;
