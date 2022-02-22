const express = require('express');
const router = express.Router();
const {
  addUsers,
  getUsers,
  removeUsers,
  addOneUser,
  getOneUser,
  putOneUser,
  removeOneUser,
} = require('../controllers/users.controller');

router.post('/users', addUsers);
router.get('/users', getUsers);
router.delete('/users', removeUsers);
router.post('/user', addOneUser);
router.get('/user/:id', getOneUser);
router.put('/user', putOneUser);
router.delete('/user/:id', removeOneUser);

module.exports = router;
