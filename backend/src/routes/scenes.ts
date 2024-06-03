import express from 'express';
import { addScene, deleteScene, updateScene, getUserScenes } from '../controllers/sceneController';

const router = express.Router();

router.post('/add', addScene); // 添加场景
router.delete('/delete/:sceneId', deleteScene); // 删除场景
router.put('/update', updateScene); // 更新场景
router.get('/user/:userId', getUserScenes); // 获取用户所有场景

export default router;
