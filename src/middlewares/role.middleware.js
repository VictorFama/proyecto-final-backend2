const User = require('../models/user.model');

// solo dejo pasar si el usuario tiene alguno de los roles permitidos, mira el rol del token
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ status: 'error', message: 'no autenticado' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ status: 'error', message: 'acceso denegado' });
    }
    next();
  };
}

// igual que el anterior pero busca el rol actual en la base, asi un token viejo con rol cambiado no pasa
function authorizeRolesFromDB(...allowedRoles) {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ status: 'error', message: 'no autenticado' });
    }
    try {
      const user = await User.findById(req.user.id);
      if (!user || !allowedRoles.includes(user.role)) {
        return res.status(403).json({ status: 'error', message: 'acceso denegado' });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { authorizeRoles, authorizeRolesFromDB };
