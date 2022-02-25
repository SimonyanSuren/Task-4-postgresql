const express = require('express');
const router = express.Router();
const {
  addPosts,
  addOnePost,
  getPost,
  putPost,
  removePost,
  getPostandCommnets
} = require('../controllers/posts.controller');

router.post('/posts', addPosts);
router.post('/post', addOnePost);
router.get('/post/:id', getPost);
router.get('/post/:id/comments', getPostandCommnets);
router.put('/post', putPost);
router.delete('/post/:id', removePost);

module.exports = router;


