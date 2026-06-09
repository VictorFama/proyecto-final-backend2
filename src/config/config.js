require('dotenv').config();

// junto en un solo objeto lo que viene del .env asi no ando usando process.env por todos lados
const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI,
};

module.exports = { config };
