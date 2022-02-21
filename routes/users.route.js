const express = require('express');
const router = express.Router();
const {
  addUsers,
  getUsers,
  removeUsers,
} = require('../controllers/users.controller');

router.post('/users', addUsers);
router.get('/users', getUsers);
router.delete('/users', removeUsers);

module.exports = router;
