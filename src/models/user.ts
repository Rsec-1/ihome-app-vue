// src/models/user.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, '用户名是必填项'], unique: true, minlength: 3 },
  password: { type: String, required: [true, '密码是必填项'], minlength: 6 },
  email: { type: String, match: [/.+\@.+\..+/, '请输入有效的邮箱地址'] },
  nickname: { type: String, default: () => `User${Math.floor(Math.random() * 10000)}` },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export default User;
