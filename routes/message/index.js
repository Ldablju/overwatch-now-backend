const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

// Controllers
const friends = require('../../controllers/friendController');

// Models
const User = require('../../models/user');

// View chat by friend id
router.get('/:frinedId', auth, async (req, res, next) => {
    // const friend = await User.findOne({ _id: req.params.frinedId}).select('tagName')
    // in progres
    res.status(200)
})

module.exports = router;