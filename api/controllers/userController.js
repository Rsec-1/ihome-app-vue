const bcrypt = require("bcryptjs");
const User = require("../models/user");

const generateRandomNickname = () => {
  return "user_" + Math.random().toString(36).substring(2, 15);
};

exports.registerUser = async (req, res) => {
  try {
    const { username, password, email, nickname } = req.body;

    // 检查用户名是否已经存在
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "用户名已存在" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const generatedNickname = nickname || generateRandomNickname();
    const user = new User({
      username,
      password: hashedPassword,
      email,
      nickname: generatedNickname,
    });
    await user.save();
    res
      .status(201)
      .json({
        success: true,
        message: "用户注册成功",
        data: { userId: user._id },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "服务器内部错误" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: "凭证无效" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "凭证无效" });
    }
    res.status(200).json({ success: true, message: "用户登录成功" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "服务器内部错误" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId, email, nickname } = req.body;
    const updatedData = {};
    if (email) updatedData.email = email;
    if (nickname) updatedData.nickname = nickname;
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ success: false, message: "用户未找到" });
    }
    res
      .status(200)
      .json({ success: true, message: "用户信息更新成功", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "服务器内部错误" });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "用户未找到" });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "旧密码不正确" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).json({ success: true, message: "密码更新成功" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "服务器内部错误" });
  }
};

// 删除用户
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "用户未找到" });
    }
    res.status(200).json({ success: true, message: "用户删除成功" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "服务器内部错误" });
  }
};

// 获取所有用户
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "服务器内部错误" });
  }
};
