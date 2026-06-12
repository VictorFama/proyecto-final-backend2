const { Router } = require('express');
const { profile, admin } = require('../controllers/user.controller');
const { authenticateJWT } = require('../middlewares/auth.middleware');
const { authorizeRolesFromDB } = require('../middlewares/role.middleware');

const router = Router();

// profile pide estar logueado, admin ademas pide rol admin (chequeado contra la base)
router.get('/profile', authenticateJWT, profile);
router.get('/admin', authenticateJWT, authorizeRolesFromDB('admin'), admin);

module.exports = router;
