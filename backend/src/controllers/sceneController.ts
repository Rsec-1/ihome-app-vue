import { Request, Response } from 'express';
import Scene from '../models/scene';

// 添加场景
export const addScene = async (req: Request, res: Response) => {
    try {
        const { userId, name, conditions, actions } = req.body;
        const scene = new Scene({ userId, name, conditions, actions });
        await scene.save();
        res.status(201).json({ message: '场景添加成功', scene });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// 删除场景
export const deleteScene = async (req: Request, res: Response) => {
    try {
        const { sceneId } = req.params;
        const scene = await Scene.findByIdAndDelete(sceneId);
        if (!scene) {
            return res.status(404).json({ message: '场景未找到' });
        }
        res.status(200).json({ message: '场景删除成功' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// 更新场景
export const updateScene = async (req: Request, res: Response) => {
    try {
        const { sceneId, name, conditions, actions } = req.body;
        const scene = await Scene.findByIdAndUpdate(sceneId, { name, conditions, actions }, { new: true });
        if (!scene) {
            return res.status(404).json({ message: '场景未找到' });
        }
        res.status(200).json({ message: '场景更新成功', scene });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// 获取用户所有场景
export const getUserScenes = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const scenes = await Scene.find({ userId });
        res.status(200).json({ scenes });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
