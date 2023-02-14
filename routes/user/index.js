const express = require('express');
const router = express.Router();

// Controllers
const user = require('../../controllers/userController');

// Login
router.post('/login', user.userLogin);
// Register
router.post('/register', user.userRegister);

module.exports = router;
