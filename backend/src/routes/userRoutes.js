import express from 'express';
import { getAllUsersExceptLoggedIn } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getAllUsersExceptLoggedIn);

export default router;
