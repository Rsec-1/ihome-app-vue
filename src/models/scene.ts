import mongoose, { Schema, Document } from 'mongoose';

interface IAction {
    deviceId: mongoose.Types.ObjectId;
    command: string; // e.g., "turn_on", "turn_off", "set_temperature"
    params?: any; // Additional parameters for the command
}

interface ICondition {
    type: string; // e.g., "time", "device_status"
    params: any; // Parameters for the condition
}

interface IScene extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    conditions: ICondition[];
    actions: IAction[];
    createdAt: Date;
}

const sceneSchema: Schema = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    conditions: [{
        type: { type: String, required: true },
        params: { type: Schema.Types.Mixed, required: true }
    }],
    actions: [{
        deviceId: { type: mongoose.Types.ObjectId, ref: 'Device', required: true },
        command: { type: String, required: true },
        params: { type: Schema.Types.Mixed }
    }],
    createdAt: { type: Date, default: Date.now }
});

const Scene = mongoose.model<IScene>('Scene', sceneSchema);

export default Scene;
