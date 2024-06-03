import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import indexRoutes from './routes/index'; // 导入根路径路由
import userRoutes from './routes/users';
import houseRoutes from './routes/houses';
import roomRoutes from './routes/rooms';
import deviceRoutes from './routes/devices';
import sceneRoutes from './routes/scenes';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', indexRoutes); // 使用根路径路由
app.use('/api/users', userRoutes);
app.use('/api/houses', houseRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/scenes', sceneRoutes);

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/your-database-name';
mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

export default app;
