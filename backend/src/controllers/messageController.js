import { Messages } from '../services/messageService.js';

export const getMessages = async (req, res) => {
    try {
        const messages = await Messages();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener mensajes' });
    }
};
