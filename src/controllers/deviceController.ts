import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Device from '../models/device';
import Room from '../models/room';

// 添加设备
export const addDevice = async (req: Request, res: Response) => {
    try {
        const { roomId, name, type, brand, icon, location } = req.body;
        const device = new Device({ roomId, name, type, brand, icon, location });
        await device.save();

        const room = await Room.findById(roomId);
        if (room) {
            room.devices.push(device._id as mongoose.Types.ObjectId);
            await room.save();
        } else {
            return res.status(404).json({ message: '房间未找到' });
        }

        res.status(201).json({ message: '设备添加成功', device });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// 删除设备
export const deleteDevice = async (req: Request, res: Response) => {
    try {
        const { deviceId } = req.params;
        const device = await Device.findByIdAndDelete(deviceId);

        if (!device) {
            return res.status(404).json({ message: '设备未找到' });
        }

        const room = await Room.findById(device.roomId);
        if (room) {
            room.devices = room.devices.filter(id => id.toString() !== (device._id as mongoose.Types.ObjectId).toString());
            await room.save();
        }

        res.status(200).json({ message: '设备删除成功' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// 更新设备
export const updateDevice = async (req: Request, res: Response) => {
    try {
        const { deviceId, name, type, brand, icon, status, location } = req.body;
        const device = await Device.findByIdAndUpdate(deviceId, { name, type, brand, icon, status, location }, { new: true });

        if (!device) {
            return res.status(404).json({ message: '设备未找到' });
        }

        res.status(200).json({ message: '设备更新成功', device });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// 获取房间所有设备
export const getRoomDevices = async (req: Request, res: Response) => {
    try {
        const { roomId } = req.params;
        const devices = await Device.find({ roomId });
        res.status(200).json({ devices });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// 获取设备详情
export const getDeviceDetails = async (req: Request, res: Response) => {
    try {
        const { deviceId } = req.params;
        const device = await Device.findById(deviceId);
        if (!device) {
            return res.status(404).json({ message: '设备未找到' });
        }
        res.status(200).json({ device });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// 远程控制设备
export const controlDevice = async (req: Request, res: Response) => {
    try {
        const { deviceId, action } = req.body;
        const device = await Device.findById(deviceId);
        if (!device) {
            return res.status(404).json({ message: '设备未找到' });
        }

        // 根据 action 控制设备，这里只做简单示例
        switch (action) {
            case 'turn_on':
                device.status = 'online';
                break;
            case 'turn_off':
                device.status = 'offline';
                break;
            // 可以根据需要添加更多操作
            default:
                return res.status(400).json({ message: '无效的操作' });
        }

        await device.save();
        res.status(200).json({ message: '设备控制成功', device });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
