import express from 'express';
import { getAllUsersExceptLoggedIn } from '../controllers/userController.js';
import {authenticate} from "../middlewares/auth.js";

const router = express.Router();

router.get('/users', authenticate, getAllUsersExceptLoggedIn);

export default router;
