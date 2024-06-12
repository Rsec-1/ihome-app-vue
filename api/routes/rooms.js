const express = require("express");
const {
  addRoom,
  deleteRoom,
  updateRoom,
  getHouseRooms,
} = require("../controllers/roomController");
const { requireSignin, fetchUserProfile } = require("../middleware/auth");

const router = express.Router();

router.post("/add", requireSignin, fetchUserProfile, addRoom); // 添加房间
router.delete("/delete/:roomId", requireSignin, fetchUserProfile, deleteRoom); // 删除房间
router.put("/update", requireSignin, fetchUserProfile, updateRoom); // 更新房间
router.get("/house/:houseId", requireSignin, fetchUserProfile, getHouseRooms); // 获取房子的所有房间

module.exports = router;
