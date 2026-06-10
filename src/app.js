const express = require('express');
const router = require('./routes');

const app = express();

app.use(express.json());

// todas las rutas cuelgan de /api/v1
app.use('/api/v1', router);

module.exports = app;
