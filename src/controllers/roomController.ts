import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Room from '../models/room';
import House from '../models/house';

// 添加房间
export const addRoom = async (req: Request, res: Response) => {
    try {
        const { houseId, name } = req.body;
        const room = new Room({ houseId, name });
        await room.save();

        const house = await House.findById(houseId);
        if (house) {
            house.rooms.push(room._id as mongoose.Types.ObjectId);
            await house.save();
        } else {
            return res.status(404).json({ message: '房子未找到' });
        }

        res.status(201).json({ message: '房间添加成功', room });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// 删除房间
export const deleteRoom = async (req: Request, res: Response) => {
    try {
        const { roomId } = req.params;
        const room = await Room.findByIdAndDelete(roomId);

        if (!room) {
            return res.status(404).json({ message: '房间未找到' });
        }

        const house = await House.findById(room.houseId);
        if (house) {
            house.rooms = house.rooms.filter(id => id.toString() !== (room._id as mongoose.Types.ObjectId).toString());
            await house.save();
        }

        res.status(200).json({ message: '房间删除成功' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// 更新房间
export const updateRoom = async (req: Request, res: Response) => {
    try {
        const { roomId, name } = req.body;
        const room = await Room.findByIdAndUpdate(roomId, { name }, { new: true });

        if (!room) {
            return res.status(404).json({ message: '房间未找到' });
        }

        res.status(200).json({ message: '房间更新成功', room });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// 获取房子的所有房间
export const getHouseRooms = async (req: Request, res: Response) => {
    try {
        const { houseId } = req.params;
        const rooms = await Room.find({ houseId });
        res.status(200).json({ rooms });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
