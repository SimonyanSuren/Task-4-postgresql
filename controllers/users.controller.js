const {
  fetchUsers,
  getUsersFromDB,
  removeUsersFromDB,
  tableHasRow,
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
  if (!result.length) {
    res.send('There are no users to get.');
    return;
  }
  res.send(result);
}

async function removeUsers(req, res, next) {
  const result = await removeUsersFromDB();
  if (!result) {
    res.send('There are no users to delete.');
    return;
  }
  res.send('Users deleted.');
}

module.exports = { addUsers, getUsers, removeUsers };
