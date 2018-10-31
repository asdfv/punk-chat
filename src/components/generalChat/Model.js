import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;
const schema = {
    messages: [{ type: ObjectId, ref: 'Message' }],
    participants: [{ type: ObjectId, ref: 'User' }]
};
const options = { timestamps: true };

export default mongoose.model('GeneralChat', new mongoose.Schema(schema, options));
