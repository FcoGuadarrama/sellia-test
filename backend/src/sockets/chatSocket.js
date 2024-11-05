import Message from '../models/Message.js';

export default (io) => {
    io.on('connection', (socket) => {
        console.log('Client connected');

        socket.on('sendMessage', async (data) => {
            const { username, message } = data;
            const newMessage = new Message({ username, message });
            await newMessage.save();
            io.emit('receiveMessage', newMessage);
        });

        socket.on('disconnect', () => {
            console.log('Usuario desconectado');
        });
    });
};
