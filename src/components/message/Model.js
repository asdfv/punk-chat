import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;
const schema = {
    text: { type: String },
    owner: { type: ObjectId, ref: 'User' }
};
const options = { timestamps: true };

export default mongoose.model('Message', new mongoose.Schema(schema, options));
