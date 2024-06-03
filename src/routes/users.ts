// src/routes/users.ts
import express from 'express';
import { registerUser, loginUser, updateUser, updatePassword } from '../controllers/userController';

const router = express.Router();

router.post('/register', registerUser); // 注册用户路由
router.post('/login', loginUser); // 登录用户路由
router.put('/update', updateUser); // 更新用户信息路由
router.put('/updatePassword', updatePassword); // 更新用户密码路由

export default router;
