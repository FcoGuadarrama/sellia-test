import User from '../models/User.js'; // Asegúrate de importar tu modelo de usuario

export const getAllUsersExceptLoggedIn = async (req, res) => {
    const loggedInUserId = req.user?._id; // Asegúrate de que req.user esté definido

    if (!loggedInUserId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    try {
        const users = await User.find({ _id: { $ne: loggedInUserId } }); // Obtén todos los usuarios excepto el que está logueado
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};
