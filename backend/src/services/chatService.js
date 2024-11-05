import Chat from '../models/Chat.js';
import Message from '../models/Message.js';

export const createChat = async (userIds) => {
    const chat = new Chat({ participants: userIds });
    await chat.save();
    return chat;
};

export const getUserChats = async (userId) => {
    return Chat.find({participants: userId})
        .populate('participants', 'username')
        .populate('messages')
        .sort({timestamp: -1});
};

export const getChatMessages = async (chatId) => {
    return Message.find({chatId}).populate('sender', 'username');
}