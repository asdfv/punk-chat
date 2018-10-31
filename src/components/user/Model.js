import mongoose from 'mongoose';

const schema = {
    name: { type: String, required: true }
};
const options = { timestamps: true };

export default mongoose.model('User', new mongoose.Schema(schema, options));
