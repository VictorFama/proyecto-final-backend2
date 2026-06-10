const { verifyAccessToken } = require('../utils/auth');

// chequeo que venga un jwt valido sino corto con 401
function authenticateJWT(req, res, next) {
  // lo busco primero en la cookie y si no esta en el header authorization
  let token = req.cookies && req.cookies.authToken;
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'token no proporcionado' });
  }

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    return res.status(401).json({ status: 'error', message: 'token invalido o vencido' });
  }
}

module.exports = { authenticateJWT };
