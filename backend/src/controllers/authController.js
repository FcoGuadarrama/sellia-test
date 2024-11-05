import { register, login } from '../services/authService.js';

export const authRegister = async (req, res) => {
    const { username, password } = req.body;
    try {
        await register(username, password);
        res.status(201).json({ message: 'Usuario registrado' });
    } catch (error) {
        res.status(500).json({ error: 'Error en el registro ' + error });
    }
};

export const authLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await login(username, password);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: 'Credenciales inválidas' });
    }
};
