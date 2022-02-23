const express = require('express');
const {
  addComments,
  addComment,
  getComment,
  putComment,
  removeComment,
} = require('../controllers/comments.controller');
const router = express.Router();

router.post('/comments', addComments);
router.post('/comment', addComment);
router.get('/comment/:id', getComment);
router.put('/comment', putComment);
router.delete('/comment/:id', removeComment);

module.exports = router;
