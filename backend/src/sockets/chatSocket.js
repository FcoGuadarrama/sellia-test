import Message from '../models/Message.js';

export default (io) => {
    io.on('connection', (socket) => {
        console.log('Client connected');

        socket.on('sendMessage', async (data) => {
            const { chatId, message, sender, timestamp } = data;
            const newMessage = new Message({ chatId, message, sender, timestamp});
            await newMessage.save();
            io.emit('receiveMessage', data);
        });

        socket.on('disconnect', () => {
            console.log('Usuario desconectado');
        });
    });
};
