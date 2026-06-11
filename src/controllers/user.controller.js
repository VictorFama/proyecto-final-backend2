const User = require('../models/user.model');
const { AppError, asyncHandler } = require('../middlewares/error.middleware');

// perfil del usuario logueado, el id sale del token
const profile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    throw new AppError('usuario no encontrado', 404);
  }
  res.json({ status: 'success', user });
});

// recurso solo para admins
const admin = (req, res) => {
  res.json({ status: 'success', message: 'bienvenido admin, tenes acceso a esta ruta' });
};

module.exports = { profile, admin };
