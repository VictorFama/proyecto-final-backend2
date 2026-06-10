const { Router } = require('express');
const { getSession } = require('../controllers/session.controller');

const router = Router();

router.get('/session', getSession);

module.exports = router;
