const { Strategy } = require('passport-github2');
const { config } = require('../config/config');
const User = require('../models/user.model');

// estrategia de github: si el usuario ya entro alguna vez lo busco por githubId
// y si es la primera vez lo creo sin password (entra por github, no local)
const githubStrategy = new Strategy(
  {
    clientID: config.github.clientId,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackUrl,
    scope: ['user:email'], // pido el mail asi lo puedo guardar
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ githubId: profile.id });
      if (user) {
        return done(null, user);
      }

      // github no siempre manda el mail, dejo un fallback por las dudas
      const email = profile.emails?.[0]?.value || `${profile.username}@github.local`;

      // armo nombre y apellido con lo que venga del perfil
      const nombre = profile.displayName || profile.username || 'usuario github';
      const partes = nombre.split(' ');

      user = await User.create({
        first_name: partes[0],
        last_name: partes.slice(1).join(' ') || 'github',
        email,
        role: 'user',
        authProvider: 'github',
        githubId: profile.id,
      });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

module.exports = githubStrategy;
