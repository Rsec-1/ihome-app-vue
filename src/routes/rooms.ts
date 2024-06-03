import express from 'express';
import { addRoom, deleteRoom, updateRoom, getHouseRooms } from '../controllers/roomController';

const router = express.Router();

router.post('/add', addRoom); // 添加房间
router.delete('/delete/:roomId', deleteRoom); // 删除房间
router.put('/update', updateRoom); // 更新房间
router.get('/house/:houseId', getHouseRooms); // 获取房子的所有房间

export default router;
