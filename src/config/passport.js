const passport = require('passport');
const localStrategy = require('../strategies/local.strategy');
const User = require('../models/user.model');

// registro las estrategias que va a usar passport
passport.use('local', localStrategy);

// en la sesion guardo solo el id del usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// con ese id despues traigo el usuario completo de la base
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
