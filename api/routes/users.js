const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  updatePassword,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");
const { requireSignin, isAuth, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser); // Register user route
router.post("/login", loginUser); // Login user route

router.put("/update", requireSignin, isAuth, updateUser); // Update user info route
router.put("/updatePassword", requireSignin, isAuth, updatePassword); // Update user password route
router.delete("/delete/:userId", requireSignin, isAuth, deleteUser); // Delete user route
router.get("/all", requireSignin, isAdmin, getAllUsers); // Get all users

module.exports = router;
