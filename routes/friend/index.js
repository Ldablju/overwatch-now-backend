const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const checkIdLength = require('../../middleware/checkIdLength');

// Controllers
const friends = require('../../controllers/friendController');

// Friends list
router.get('/list', auth, friends.getFriendsList)
// Send invite
router.post('/invite/:profileId', auth, checkIdLength, friends.sendInvite)
// Accept invite
router.post('/invite/accept/:inviteId', auth, checkIdLength, friends.acceptInvite)
// Remove invite
router.delete('/invite/remove/:inviteId', auth, checkIdLength, friends.removeInvite)

module.exports = router;