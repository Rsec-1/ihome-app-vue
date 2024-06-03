// src/server.ts
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/users';
import houseRoutes from './routes/houses'; // 导入房子路由
import roomRoutes from './routes/rooms'; // 导入房间路由
import deviceRoutes from './routes/devices'; // 导入设备路由
import sceneRoutes from './routes/scenes'; // 导入场景路由
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // 确保 CORS 正确配置
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/houses', houseRoutes);
app.use('/api/rooms', roomRoutes); // 使用房间路由
app.use('/api/devices', deviceRoutes); // 使用设备路由
app.use('/api/scenes', sceneRoutes); // 使用场景路由

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/your-database-name';
mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
