const {
  addUserToDB,
  getOneUserFromDB,
  putOneUserFromDB,
  removeOneUserFromDB,
} = require('../models/oneuser.model');

async function addOneUser(req, res, next) {
  const result = await addUserToDB(req.body);
  res.send(result);
}

async function getOneUser(req, res, next) {
  const userId = req.params.id;
  const result = await getOneUserFromDB(userId);
  if (result == false) {
    res.send('There is not such a user.');
  } else {
    res.send(result);
  }
}

async function putOneUser(req, res, next) {
  const userId = req.get('userId');
  const changedData = req.body;
  let result = await putOneUserFromDB(userId, changedData);
  result = Object.assign(result[0], changedData);
  res.send(result);
}

async function removeOneUser(req, res, next) {
  const userId = req.params.id;
  const result = await removeOneUserFromDB(userId);
  if (result == false) {
    res.send('There is not such a user.');
  } else {
    res.send(result);
  }
}

module.exports = { addOneUser, getOneUser, putOneUser, removeOneUser };
