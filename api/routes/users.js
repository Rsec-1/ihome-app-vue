const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  updatePassword,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser); // 注册用户路由
router.post("/login", loginUser); // 登录用户路由
router.put("/update", updateUser); // 更新用户信息路由
router.put("/updatePassword", updatePassword); // 更新用户密码路由
router.delete("/delete/:userId", deleteUser); // 删除用户路由
router.get("/all", getAllUsers); // 获取所有用户

module.exports = router;
