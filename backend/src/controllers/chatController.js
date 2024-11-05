import { createChat, getUserChats, getChatMessages } from '../services/chatService.js';
import mongoose from "mongoose";
import Chat from "../models/Chat.js";

export const createNewChat = async (req, res) => {
    let { participants } = req.body;
    const loggedInUserId = req.user?._id;

    if (!loggedInUserId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    try {
        if (!Array.isArray(participants)) {
            participants = [participants.userId];
        } else {
            participants = participants.map(user => user.userId);
        }

        if (!participants.includes(loggedInUserId.toString())) {
            participants.push(loggedInUserId.toString());
        }
        const chat = await createChat(participants);
        res.status(201).json(chat);
    } catch (error) {
        console.error('Error creating chat:', error); // Log error for debugging
        res.status(500).json({ error: 'Error al crear el chat' });
    }
};

export const checkChatExists = async (req, res) => {
    const { userId, currentUserId } = req.query;

    try {
        const chat = await Chat.findOne({
            participants: { $all: [userId, currentUserId] },
        });
        res.json({ exists: !!chat });
    } catch (error) {
        console.error('Error checking chat existence:', error);
        res.status(500).json({ error: 'Error checking chat existence' });
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

    // Validate chatId
    if (!chatId || !mongoose.Types.ObjectId.isValid(chatId)) {
        return res.status(400).json({ error: 'Invalid chatId format' });
    }

    try {
        const messages = await getChatMessages(chatId);
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error); // Log error for debugging
        res.status(500).json({ error: 'Error al obtener mensajes' });
    }
};

