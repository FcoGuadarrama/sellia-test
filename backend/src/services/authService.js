import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (username, password) => {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error('El nombre de usuario ya está en uso.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
};

export const login = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Credenciales inválidas');
    }

    return jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
};
