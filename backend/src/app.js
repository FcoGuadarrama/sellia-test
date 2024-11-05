import express from 'express';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import chatRoutes from "./routes/chatRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { authenticate } from './middlewares/auth.js';
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(cors({
    origin: process.env.ORIGIN_URL,
}));

app.use(express.json());


app.use('/api', authRoutes);
app.use('/api', messageRoutes);
app.use('/api', chatRoutes);

app.use(['/api', authenticate], userRoutes);

export default app;
