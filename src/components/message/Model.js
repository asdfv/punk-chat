import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;
const schema = {
    _id: { type: ObjectId, default: mongoose.Types.ObjectId() },
    text: { type: String, required: true },
    owner: { type: ObjectId, require: true, ref: 'User' }
};
const options = { timestamps: true };

export default mongoose.model('Message', new mongoose.Schema(schema, options));
