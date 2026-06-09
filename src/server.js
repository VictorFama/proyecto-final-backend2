require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 3000;

// primero conecto a la base y despues levanto el server
connectDB();

app.listen(PORT, () => {
  console.log(`servidor escuchando en http://localhost:${PORT}`);
});
