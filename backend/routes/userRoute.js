const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// POST /users/register: Register a new user
router.post("/register", registerUser);

// POST /users/login: Login an existing user
router.post("/login", loginUser);


// GET /users/profile: Get the current user's profile (protected route)
router.get("/profile", protect, getUserProfile);

// PUT /users/profile: Update the current user's profile (protected route)
router.put("/profile", protect, updateUserProfile);

module.exports = router;
