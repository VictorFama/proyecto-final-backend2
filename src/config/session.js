const session = require('express-session');
const MongoStore = require('connect-mongo').default; // en connect-mongo 6 el create esta en default
const { config } = require('./config');

// armo el middleware de sesion y guardo las sesiones en mongo con connect-mongo
function createSessionMiddleware() {
  return session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: config.mongoUri, ttl: 3600 }),
    cookie: {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      maxAge: 1000 * 60 * 60, // 1 hora
    },
  });
}

module.exports = createSessionMiddleware;
