const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const {connectDB} = require('./config/db')

// Initialize environment variables
dotenv.config();

// Create the Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors());

// Connect to MongoDB
connectDB()

// Basic Routes
app.get("/", (req, res) => {
    res.send("API is running...");
});
app.use("/reviews", require('./routes/reviewRoute'))
app.use("/books", require('./routes/bookRoute'))
app.use("/users", require('./routes/userRoute'))

// Example Protected Route
app.get(
    "/protected",
    asyncHandler(async (req, res) => {
        res.send("This is a protected route.");
    })
);

// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://127.0.0.1:${PORT}`));
