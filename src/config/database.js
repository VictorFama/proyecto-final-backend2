const mongoose = require('mongoose');
const { config } = require('./config');

// conecta a la base de mongo atlas con mongoose
async function connectDB() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('conectado a mongo');
  } catch (error) {
    console.error('no se pudo conectar a mongo:', error.message);
    process.exit(1); // si no hay base no tiene sentido seguir
  }
}

module.exports = connectDB;
