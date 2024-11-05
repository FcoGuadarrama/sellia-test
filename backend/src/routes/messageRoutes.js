import express from 'express';
import { getMessages, postMessage } from '../controllers/messageController.js';
import {authenticate} from "../middlewares/auth.js";

const router = express.Router();

router.get('/messages', authenticate, getMessages);
router.post('/messages', authenticate, postMessage);


export default router;
