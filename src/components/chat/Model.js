import mongoose from 'mongoose';

const schema = {
    createdAt: { type: Date, required: true, default: Date.now },
    name: { type: String, required: true }
};
const options = { timestamps: true };

export default mongoose.model('Chat', new mongoose.Schema(schema, options))
