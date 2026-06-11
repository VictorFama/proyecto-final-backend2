const { Router } = require('express');
const passport = require('../config/passport');
const { register, login, githubCallback } = require('../controllers/auth.controller');

const router = Router();

router.post('/register', register);
router.post('/login', login);

// arranca el flujo de github, te manda a la pantalla de github a autorizar
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// aca vuelve github despues de autorizar
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/api/v1/auth/github/error' }),
  githubCallback
);

module.exports = router;
