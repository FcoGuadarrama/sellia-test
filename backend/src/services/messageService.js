import Message from '../models/Message.js';

export const Messages = async () => {
    return Message.find().sort({timestamp: 1});
};
