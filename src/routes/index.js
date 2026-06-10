const { Router } = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const sessionRoutes = require('./session.routes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/', userRoutes); // profile y admin
router.use('/', sessionRoutes); // session



// ruta para ver si el server esta andando
router.get('/health', (_req, res) => res.json({ status: 'ok' }));

module.exports = router;
