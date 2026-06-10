const { Strategy } = require('passport-local');
const User = require('../models/user.model');

// estrategia local: valido email y password contra la base
const localStrategy = new Strategy(
  { usernameField: 'email' }, // por defecto passport usa username, le digo que use email
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user || !user.password) {
        return done(null, false, { message: 'credenciales invalidas' });
      }

      const ok = await user.comparePassword(password);
      if (!ok) {
        return done(null, false, { message: 'credenciales invalidas' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

module.exports = localStrategy;
