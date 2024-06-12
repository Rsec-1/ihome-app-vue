const { expressjwt: expressJwt } = require("express-jwt");
const User = require("../models/user");

// Middleware to fetch user profile
exports.fetchUserProfile = async (req, res, next) => {
  const userId = req.auth.id;
  if (!userId) {
    return res.status(400).json({ error: "User ID not found in token" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    req.profile = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// Authentication middleware
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
  getToken: (req) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    }
    return null;
  },
});

// Authorization middleware for user
exports.isAuth = (req, res, next) => {
  const user =
    req.profile && req.auth && req.profile._id.toString() === req.auth.id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

// Authorization middleware for admin
exports.isAdmin = (req, res, next) => {
  if (req.auth.role !== "admin") {
    return res.status(403).json({
      error: "Admin resource! Access denied",
    });
  }
  next();
};
