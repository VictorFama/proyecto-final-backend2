const passport = require('passport');
const localStrategy = require('../strategies/local.strategy');

// registro las estrategias que va a usar passport
passport.use('local', localStrategy);

module.exports = passport;
