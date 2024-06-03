// src/server.ts
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/users';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // 确保 CORS 正确配置
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/your-database-name';
mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
