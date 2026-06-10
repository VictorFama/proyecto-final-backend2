require('dotenv').config();

// junto en un solo objeto lo que viene del .env asi no ando usando process.env por todos lados
const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  sessionSecret: process.env.SESSION_SECRET,
};

module.exports = { config };
