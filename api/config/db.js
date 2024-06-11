var mongoose = require('mongoose');
require('dotenv').config(); // 加载环境变量

var connectDB = async () => {
  try {
    var mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI);
    console.log('MongoDB 连接成功');
  } catch (err) {
    console.error('MongoDB 连接失败', err);
    process.exit(1);
  }
};

module.exports = connectDB;
