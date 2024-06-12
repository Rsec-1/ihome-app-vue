const express = require("express");
const {
  addDevice,
  deleteDevice,
  updateDevice,
  getRoomDevices,
  getDeviceDetails,
  controlDevice,
} = require("../controllers/deviceController");
const { requireSignin, fetchUserProfile } = require("../middleware/auth");

const router = express.Router();

router.post("/add", requireSignin, fetchUserProfile, addDevice); // 添加设备
router.delete(
  "/delete/:deviceId",
  requireSignin,
  fetchUserProfile,
  deleteDevice
); // 删除设备
router.put("/update", requireSignin, fetchUserProfile, updateDevice); // 更新设备
router.get("/room/:roomId", requireSignin, fetchUserProfile, getRoomDevices); // 获取房间所有设备
router.get(
  "/details/:deviceId",
  requireSignin,
  fetchUserProfile,
  getDeviceDetails
); // 获取设备详情
router.post("/control", requireSignin, fetchUserProfile, controlDevice); // 远程控制设备

module.exports = router;
