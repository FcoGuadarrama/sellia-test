import {Messages, sendMessage} from '../services/messageService.js';

export const getMessages = async (req, res) => {
    try {
        const messages = await Messages();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener mensajes' });
    }
};

export const postMessage = async (req, res) => {
    const { chatId, message, sender } = req.body;

    if (!chatId || !message || !sender) {
        return res.status(400).json({ error: 'chatId, message y sender son requeridos' });
    }

    try {
        const newMessage = await sendMessage({ chatId, message, sender });

        return res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error al enviar mensaje:', error.message || error);
        return res.status(500).json({ error: 'Error al enviar mensaje' });
    }
};
