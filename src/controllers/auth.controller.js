const passport = require('../config/passport');
const User = require('../models/user.model');
const { createAccessToken, getAuthCookieOptions, getClearCookieOptions } = require('../utils/auth');

// registro de un usuario nuevo
const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // chequeo que no haya otro con el mismo mail
    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(409).json({ status: 'error', message: 'el email ya esta registrado' });
    }

    const user = await User.create({ first_name, last_name, email, password });

    // devuelvo el usuario sin la password
    res.status(201).json({
      status: 'success',
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// login local: uso passport con custom callback asi manejo yo las respuestas
const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    if (!user) {
      return res.status(401).json({ status: 'error', message: info?.message || 'credenciales invalidas' });
    }

    const token = createAccessToken(user);

    // mando el token en la cookie y tambien en el body
    res
      .cookie('authToken', token, getAuthCookieOptions())
      .json({ status: 'success', token });
  })(req, res, next);
};

// callback de github: cuando vuelve del login passport ya dejo el user en req.user
// le genero el mismo jwt que en el login local asi puede usar las rutas protegidas
const githubCallback = (req, res) => {
  const token = createAccessToken(req.user);

  res
    .cookie('authToken', token, getAuthCookieOptions())
    .json({
      status: 'success',
      message: 'login con github ok',
      token,
      user: {
        id: req.user._id,
        email: req.user.email,
        role: req.user.role,
        authProvider: req.user.authProvider,
      },
    });
};

// logout: cierro la sesion de passport, la destruyo y borro la cookie del token
const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });

    // destruyo la sesion en la base y limpio las cookies
    req.session.destroy(() => {
      res
        .clearCookie('authToken', getClearCookieOptions())
        .clearCookie('connect.sid')
        .json({ status: 'success', message: 'sesion cerrada' });
    });
  });
};

module.exports = { register, login, githubCallback, logout };
