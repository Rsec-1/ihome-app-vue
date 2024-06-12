const express = require("express");
const {
  addHouse,
  deleteHouse,
  updateHouse,
  getUserHouses,
} = require("../controllers/houseController");
const { requireSignin, fetchUserProfile } = require("../middleware/auth");

const router = express.Router();

router.post("/add", requireSignin, fetchUserProfile, addHouse); // 添加房子路由
router.delete("/delete/:houseId", requireSignin, fetchUserProfile, deleteHouse); // 删除房子路由
router.put("/update", requireSignin, fetchUserProfile, updateHouse); // 更新房子路由
router.get("/user/:userId", requireSignin, fetchUserProfile, getUserHouses); // 获取用户所有房子路由

module.exports = router;
