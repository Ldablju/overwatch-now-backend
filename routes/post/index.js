const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const checkIdLength = require('../../middleware/checkIdLength');

// Controllers
const post = require('../../controllers/postController');

// View post list
router.get('/', auth, post.getPostController);
// View post by id
router.get('/:post_id', auth, checkIdLength, post.getSinglePost);
// Add new post
router.post('/add', auth, post.createPost);
// Like post
router.post('/like/:post_id', auth, checkIdLength, post.likePost);
// Comment post
router.post('/comment/:post_id', auth, checkIdLength, post.commentPost);
// Remove post
router.delete('/delete/:post_id', auth, checkIdLength, post.removePost);

module.exports = router;