const express = require("express");
const {
  addDevice,
  deleteDevice,
  updateDevice,
  getRoomDevices,
  getDeviceDetails,
  controlDevice,
} = require("../controllers/deviceController");

const router = express.Router();

router.post("/add", addDevice); // 添加设备
router.delete("/delete/:deviceId", deleteDevice); // 删除设备
router.put("/update", updateDevice); // 更新设备
router.get("/room/:roomId", getRoomDevices); // 获取房间所有设备
router.get("/details/:deviceId", getDeviceDetails); // 获取设备详情
router.post("/control", controlDevice); // 远程控制设备

module.exports = router;
