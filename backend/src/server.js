import http from 'http';
import { Server as SocketServer } from 'socket.io';
import 'dotenv/config';
import connectDB from './utils/db.js';
import app from './app.js';
import chatSocket from './sockets/chatSocket.js';

const server = http.createServer(app);
const io = new SocketServer(server, { cors: { origin: process.env.ORIGIN_URL } });
chatSocket(io);

const port = process.env.PORT || 3000;

connectDB()
    .then(() => {
        server.listen(port, () => console.log(`Server started on port ${port}`));
    })
    .catch((err) => console.log(err));
