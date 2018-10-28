import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;
const schema = {
    _id: { type: ObjectId, default: mongoose.Types.ObjectId() },
    name: { type: String, required: true }
};
const options = { timestamps: true };

export default mongoose.model('User', new mongoose.Schema(schema, options));
