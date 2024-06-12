const express = require("express");
const {
  addScene,
  deleteScene,
  updateScene,
  getUserScenes,
} = require("../controllers/sceneController");
const { requireSignin, fetchUserProfile } = require("../middleware/auth");

const router = express.Router();

router.post("/add", requireSignin, fetchUserProfile, addScene); // 添加场景
router.delete("/delete/:sceneId", requireSignin, fetchUserProfile, deleteScene); // 删除场景
router.put("/update", requireSignin, fetchUserProfile, updateScene); // 更新场景
router.get("/user/:userId", requireSignin, fetchUserProfile, getUserScenes); // 获取用户所有场景

module.exports = router;
