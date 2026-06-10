const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// todas las rutas cuelgan de /api/v1
app.use('/api/v1', router);

module.exports = app;
