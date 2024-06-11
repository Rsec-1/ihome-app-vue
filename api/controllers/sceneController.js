const Scene = require("../models/scene");

// 添加场景
exports.addScene = async (req, res) => {
  try {
    const { userId, name, conditions, actions } = req.body;
    const scene = new Scene({ userId, name, conditions, actions });
    await scene.save();
    res.status(201).json({ message: "场景添加成功", scene });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 删除场景
exports.deleteScene = async (req, res) => {
  try {
    const { sceneId } = req.params;
    const scene = await Scene.findByIdAndDelete(sceneId);
    if (!scene) {
      return res.status(404).json({ message: "场景未找到" });
    }
    res.status(200).json({ message: "场景删除成功" });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      return res.status(404).json({ message: "场景未找到" });
    }
    res.status(200).json({ message: "场景更新成功", scene });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 获取用户所有场景
exports.getUserScenes = async (req, res) => {
  try {
    const { userId } = req.params;
    const scenes = await Scene.find({ userId });
    res.status(200).json({ scenes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
