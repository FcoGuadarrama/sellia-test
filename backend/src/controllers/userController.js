import User from '../models/User.js';

export const getAllUsersExceptLoggedIn = async (req, res) => {
    const loggedInUserId = req.user?._id;

    if (!loggedInUserId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    try {
        const users = await User.find({ _id: { $ne: loggedInUserId } }).select('username _id');

        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};
