const {
  fetchUsers,
  getUsersFromDB,
  removeUsersFromDB,
  tableHasRow,
  addUserToDB,
  getOneUserFromDB,
  putOneUserFromDB,
  removeOneUserFromDB,
} = require('../models/users.model');

async function addUsers(req, res, next) {
  let boolean = await tableHasRow();
  if (!boolean) {
    const fetchedUsers = await fetchUsers();
    res.send(fetchedUsers);
  } else {
    res.send('Users already added');
  }
}

async function getUsers(req, res, next) {
  const result = await getUsersFromDB();
  if (result.length) {
   res.send(result); 
    return;
  }
  res.send('There are no users to get.');
}

async function removeUsers(req, res, next) {
  const result = await removeUsersFromDB();
  if (result.length) {
    res.send('Users deleted.');
    return;
  }
  res.status(404).send('There are no users to delete.');
}

async function addOneUser(req, res, next) {
  const result = await addUserToDB(req.body);
  res.send(result);
}

async function getOneUser(req, res, next) {
  const userId = req.params.id; 
  const result = await getOneUserFromDB(userId);
  if (result.length) {
    res.send(result);
  } else {
    res.status(404).send('There is not such a user.');
  }
}

async function putOneUser(req, res, next) {
  const changedData = req.body;
  let result = await putOneUserFromDB(changedData);
  if(result.length) {
	    res.send(result);
	return
  }
  res.status(404).send('There are not such a user')
}

async function removeOneUser(req, res, next) {
  const userId = req.params.id;
  const result = await removeOneUserFromDB(userId);
  if (result.length) {
    res.send(result);
  } else {
    res.status(404).send('There is not such a user.');
  }
}

module.exports = {
  addUsers,
  getUsers,
  removeUsers,
  addOneUser,
  getOneUser,
  putOneUser,
  removeOneUser,
};
