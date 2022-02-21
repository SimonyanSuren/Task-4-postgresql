const client = require('../db/connect');

async function addUserToDB(user) {
  const lastUserId =
    await client.query(`SELECT id FROM users_info ORDER BY id DESC LIMIT 1
	`);
  const lastId = lastUserId.rows[0].id + 1;
  let query = `INSERT INTO "users_info" (name, username, email, phone, website, address, id) VALUES`;
  user = Object.values(user);
  user.push(lastId);
  for (let i = 1; i <= user.length; i++) {
    query += `${i === 1 ? ' (' : ''}$${i}${
      i !== user.length ? ',' : ') RETURNING *'
    }`;
    if (typeof user[i] === 'object') {
      user[i] = JSON.stringify(user[i]);
    }
  }
  const res = await client.query(query, user);
  return res.rows;
}

async function getOneUserFromDB(id) {
  const res = await client.query(`SELECT * FROM "users_info" WHERE id=${id}`);
  return res.rows;
}

async function putOneUserFromDB(id, data) {
  const column = Object.keys(data);
  const fields = Object.values(data);
  const res = await client.query(`UPDATE users_info
	SET (${column.join()}) = ('${fields.join("','")}')
	WHERE id = ${id}
	RETURNING *`);
  return res.rows;
}

async function removeOneUserFromDB(id) {
  const res = await client.query(`DELETE FROM users_info WHERE id = ${id}
	RETURNING *`);
  return res.rows;
}
module.exports = {
  addUserToDB,
  getOneUserFromDB,
  putOneUserFromDB,
  removeOneUserFromDB,
};
