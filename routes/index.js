const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const home = require('../controllers/homeController');

// Home page
router.get('/', auth, home.getUserInfo);

module.exports = router;
