import { createChat, getUserChats, getChatMessages } from '../services/chatService.js';

export const createNewChat = async (req, res) => {
    const { userIds } = req.body;
    try {
        const chat = await createChat(userIds);
        res.status(201).json(chat);
    } catch (error) {
        console.error('Error creating chat:', error); // Log error for debugging
        res.status(500).json({ error: 'Error al crear el chat' });
    }
};

export const getChats = async (req, res) => {
    const userId = req.user?._id; // Optional chaining to avoid crashing
    if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' }); // Handle unauthenticated user
    }

    try {
        const chats = await getUserChats(userId);
        res.json(chats);
    } catch (error) {
        console.error('Error fetching chats:', error); // Log error for debugging
        res.status(500).json({ error: 'Error al obtener los chats' });
    }
};

export const getMessagesFromChat = async (req, res) => {
    const { chatId } = req.params;
    try {
        const messages = await getChatMessages(chatId);
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error); // Log error for debugging
        res.status(500).json({ error: 'Error al obtener mensajes' });
    }
};
