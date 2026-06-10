const { Router } = require('express');
const { profile, admin } = require('../controllers/user.controller');
const { authenticateJWT } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');

const router = Router();

// profile pide estar logueado, admin ademas pide rol admin
router.get('/profile', authenticateJWT, profile);
router.get('/admin', authenticateJWT, authorizeRoles('admin'), admin);

module.exports = router;
