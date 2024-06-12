const mongoose = require("mongoose");
const House = require("../models/house");
const User = require("../models/user");

// 添加房子
exports.addHouse = async (req, res) => {
  try {
    const { name, address } = req.body;
    const userId = req.auth.id; // 从JWT中获取用户ID
    const house = new House({ userId, name, address });
    await house.save();

    const user = await User.findById(userId);
    if (user) {
      user.houses.push(house._id);
      await user.save();
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(201)
      .json({ success: true, message: "House added successfully", house });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 删除房子
exports.deleteHouse = async (req, res) => {
  try {
    const { houseId } = req.params;
    const house = await House.findByIdAndDelete(houseId);

    if (!house) {
      return res
        .status(404)
        .json({ success: false, message: "House not found" });
    }

    const user = await User.findById(house.userId);
    if (user) {
      user.houses = user.houses.filter(
        (id) => id.toString() !== house._id.toString()
      );
      await user.save();
    }

    res
      .status(200)
      .json({ success: true, message: "House deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 更新房子
exports.updateHouse = async (req, res) => {
  try {
    const { houseId, name, address } = req.body;
    const house = await House.findByIdAndUpdate(
      houseId,
      { name, address },
      { new: true }
    );

    if (!house) {
      return res
        .status(404)
        .json({ success: false, message: "House not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "House updated successfully", house });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 获取用户所有房子
exports.getUserHouses = async (req, res) => {
  try {
    const userId = req.auth.id; // 从JWT中获取用户ID
    const houses = await House.find({ userId });
    res.status(200).json({ success: true, houses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
