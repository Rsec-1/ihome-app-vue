import mongoose, { Schema, Document } from 'mongoose';

interface IHouse extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    address?: string;
    rooms: mongoose.Types.ObjectId[];
}

const houseSchema: Schema = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    address: { type: String },
    rooms: [{ type: mongoose.Types.ObjectId, ref: 'Room' }],
    createdAt: { type: Date, default: Date.now }
});

const House = mongoose.model<IHouse>('House', houseSchema);

export default House;
