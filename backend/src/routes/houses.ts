import express from 'express';
import { addHouse, deleteHouse, updateHouse, getUserHouses } from '../controllers/houseController';

const router = express.Router();

router.post('/add', addHouse); // 添加房子
router.delete('/delete/:houseId', deleteHouse); // 删除房子
router.put('/update', updateHouse); // 更新房子
router.get('/user/:userId', getUserHouses); // 获取用户所有房子

export default router;
