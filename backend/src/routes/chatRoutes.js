import express from 'express';
import {checkChatExists, createNewChat, getChats, getMessagesFromChat} from '../controllers/chatController.js';
import {authenticate} from "../middlewares/auth.js";

const router = express.Router();

router.post('/chats', authenticate, createNewChat);

router.get('/chats', authenticate, getChats);

router.get('/chats/:chatId/messages', authenticate, getMessagesFromChat);

router.get('/chats/exist', authenticate, checkChatExists);

export default router;
