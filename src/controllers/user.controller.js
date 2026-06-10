const User = require('../models/user.model');

// perfil del usuario logueado, el id sale del token
const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'usuario no encontrado' });
    }
    res.json({ status: 'success', user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// recurso solo para admins
const admin = (req, res) => {
  res.json({ status: 'success', message: 'bienvenido admin, tenes acceso a esta ruta' });
};

module.exports = { profile, admin };
