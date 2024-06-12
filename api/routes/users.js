const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  updatePassword,
  deleteUser,
  getAllUsers,
  forgotPassword,
  resetPassword,
  getUserProfile,
} = require("../controllers/userController");
const { requireSignin, isAuth, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser); // Register user route
router.post("/login", loginUser); // Login user route

router.put("/update", requireSignin, isAuth, updateUser); // Update user info route
router.put("/updatePassword", requireSignin, isAuth, updatePassword); // Update user password route
router.delete("/delete/:userId", requireSignin, isAuth, deleteUser); // Delete user route
router.get("/all", requireSignin, isAdmin, getAllUsers); // Get all users
router.post("/forgot-password", forgotPassword); // Forgot password route
router.post("/reset-password", resetPassword); // Reset password route
router.get("/me", requireSignin, getUserProfile); // Get User Information route

module.exports = router;
