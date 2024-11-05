import Message from '../models/Message.js';

export const sendMessage = async ({ chatId, message, sender }) => {
    try {
        const newMessage = new Message({
            chatId,
            message,
            sender,
            timestamp: new Date()
        });

        await newMessage.save();

        return newMessage;
    } catch (error) {
        console.error('Error al guardar el mensaje:', error.message || error);
        throw new Error('No se pudo guardar el mensaje');
    }
};
export const Messages = async () => {
    return Message.find().sort({timestamp: 1});
};
