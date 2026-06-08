const express = require('express');

const app = express();

app.use(express.json());

// ruta para ver si el server esta andando
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
