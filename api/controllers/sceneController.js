const Scene = require("../models/scene");

// 添加场景
exports.addScene = async (req, res) => {
  try {
    const { name, conditions, actions } = req.body;
    const userId = req.auth.id; // 从JWT中获取用户ID
    const scene = new Scene({ userId, name, conditions, actions });
    await scene.save();
    res
      .status(201)
      .json({ success: true, message: "Scene added successfully", scene });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 删除场景
exports.deleteScene = async (req, res) => {
  try {
    const { sceneId } = req.params;
    const scene = await Scene.findByIdAndDelete(sceneId);
    if (!scene) {
      return res
        .status(404)
        .json({ success: false, message: "Scene not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Scene deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 更新场景
exports.updateScene = async (req, res) => {
  try {
    const { sceneId, name, conditions, actions } = req.body;
    const scene = await Scene.findByIdAndUpdate(
      sceneId,
      { name, conditions, actions },
      { new: true }
    );
    if (!scene) {
      return res
        .status(404)
        .json({ success: false, message: "Scene not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Scene updated successfully", scene });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 获取用户所有场景
exports.getUserScenes = async (req, res) => {
  try {
    const userId = req.auth.id; // 从JWT中获取用户ID
    const scenes = await Scene.find({ userId });
    res.status(200).json({ success: true, scenes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
