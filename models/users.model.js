const axios = require('axios');
const client = require('../db/connect');

async function fetchUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  let counter = 1;
  let query = `INSERT INTO "users_info" (id, name, username, email, address, phone, website) VALUES`;
  const usersData = response.data;
  const values = [];
  for (let i = 1; i <= usersData.length; i++) {
    const user = usersData[i - 1];
    query += ` ($${counter},$${counter + 1},$${counter + 2}, $${
      counter + 3
    }, $${counter + 4}, $${counter + 5}, $${counter + 6} )${
      i !== usersData.length ? ',' : ' RETURNING *'
    }`;
    counter += 7;
    values.push(user.id);
    values.push(user.name);
    values.push(user.username);
    values.push(user.email);
    values.push(JSON.stringify(user.address));
    values.push(user.phone);
    values.push(user.website);
  }

  const res = await client.query(query, values);
  return res.rows;
}

async function getUsersFromDB() {
  const res = await client.query(`SELECT * FROM "users_info"`);
  return res.rows;
}

async function removeUsersFromDB() {
  const res = await client.query(`DELETE FROM "users_info"`);
  return res.rowCount;
}

async function tableHasRow() {
  const res = await client.query(
    `SELECT EXISTS(SELECT * FROM users_info) AS HAS_ROW`
  );
  return res.rows[0].has_row;
}

module.exports = { fetchUsers, getUsersFromDB, removeUsersFromDB, tableHasRow };
