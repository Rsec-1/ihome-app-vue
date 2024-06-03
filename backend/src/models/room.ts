import mongoose, { Schema, Document } from 'mongoose';

interface IRoom extends Document {
    houseId: mongoose.Types.ObjectId;
    name: string;
    devices: mongoose.Types.ObjectId[];
    createdAt: Date;
}

const roomSchema: Schema = new Schema({
    houseId: { type: mongoose.Types.ObjectId, ref: 'House', required: true },
    name: { type: String, required: true },
    devices: [{ type: mongoose.Types.ObjectId, ref: 'Device' }],
    createdAt: { type: Date, default: Date.now }
});

const Room = mongoose.model<IRoom>('Room', roomSchema);

export default Room;
