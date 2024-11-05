import express from 'express';
import { createNewChat, getChats, getMessagesFromChat } from '../controllers/chatController.js';

const router = express.Router();

router.post('/chats', createNewChat);

router.get('/chats', getChats);

router.get('/chats/:chatId/messages', getMessagesFromChat);

export default router;
