// solo dejo pasar si el usuario tiene alguno de los roles permitidos
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

module.exports = { authorizeRoles };
