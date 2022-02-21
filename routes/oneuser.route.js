const express = require('express');
const router = express.Router();
const {
  addOneUser,
  getOneUser,
  putOneUser,
  removeOneUser,
} = require('../controllers/oneuser.conroller');

router.post('/user', addOneUser);
router.get('/user/:id', getOneUser);
router.put('/user', putOneUser);
router.delete('/user/:id', removeOneUser);

module.exports = router;
