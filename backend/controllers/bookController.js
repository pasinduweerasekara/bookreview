const Book = require("../models/bookModel");
const Review = require("../models/reviewModel")

// Get all books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific book by ID
const getBookById = async (req, res) => {
    try {
      // Find the book by ID
      const book = await Book.findById(req.params.id)

      if (!book) {
        return res.status(404).json({ message: "Book not found" })
      }
      
      // Fetch the reviews related to the book
      const reviews = await Review.find({ bookId: book._id })
      res.json({
        book,
        reviews,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Create a new book
const createBook = async (req, res) => {
    const { title, author, genre, publishedDate } = req.body;

    try {
        // Create a new book
        const book = new Book({
            title,
            author,
            genre,
            publishedDate,
        });

        // Save the book to the database
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing book by ID
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return the updated document
        );
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a specific book by ID
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};
