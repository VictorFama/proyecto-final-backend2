const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

const UNA_HORA_EN_MS = 60 * 60 * 1000;

// armo el token con lo que pide la consigna en el payload
function createAccessToken(user) {
  return jwt.sign(
    { userId: user._id.toString(), role: user.role },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );
}

// verifica el token y me devuelve los datos ya ordenados
function verifyAccessToken(token) {
  const p = jwt.verify(token, config.jwtSecret);
  return { id: p.userId, role: p.role, issuedAt: p.iat, expiresAt: p.exp };
}

// opciones de la cookie donde guardo el token
function getAuthCookieOptions() {
  return {
    httpOnly: true,
    secure: config.nodeEnv === 'production', // solo https en produccion
    sameSite: 'Lax',
    maxAge: UNA_HORA_EN_MS,
  };
}

// las mismas opciones pero para borrar la cookie en el logout
function getClearCookieOptions() {
  return { httpOnly: true, secure: config.nodeEnv === 'production', sameSite: 'Lax' };
}

module.exports = { createAccessToken, verifyAccessToken, getAuthCookieOptions, getClearCookieOptions };
