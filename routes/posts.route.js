const express = require('express');
const router = express.Router();
const {
  addPosts,
  addOnePost,
  getPost,
  putPost,
  removePost,
} = require('../controllers/posts.controller');

router.post('/posts', addPosts);
router.post('/post', addOnePost);
router.get('/post/:id', getPost);
router.put('/post', putPost);
router.delete('/post/:id', removePost);

module.exports = router;
