import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    message: { type: String },
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', MessageSchema);
export default Message;
