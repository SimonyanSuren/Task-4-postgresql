const axios = require('axios');
const client = require('../db/connect');

const fetchComments = async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/comments'
  );
  let counter = 1;
  let query = `INSERT INTO "users_comments" (id, name, email, body, post_id) VALUES`;
  const commentData = response.data;
  const values = [];
  for (let i = 1; i <= commentData.length; i++) {
    const comment = commentData[i - 1];
    query += ` ($${counter},$${counter + 1},$${counter + 2}, $${
      counter + 3
    }, $${counter + 4})${i !== commentData.length ? ',' : ' RETURNING *'}`;
    counter += 5;
    values.push(comment.id);
    values.push(comment.name);
    values.push(comment.email);
    values.push(comment.body);
    values.push(comment.postId);
  }

  const res = await client.query(query, values);
  return res.rows;
};

const addComment = async (comment) => {
  const lastCommentId =
    await client.query(`SELECT id FROM users_comments ORDER BY id DESC LIMIT 1
	`);
  const lastId = lastCommentId.rows[0].id + 1;
  let query = `INSERT INTO users_comments (post_id, name, email, body, id) VALUES`;
  comment = Object.values(comment);
  comment.push(lastId);
  for (let i = 1; i <= comment.length; i++) {
    query += `${i === 1 ? ' (' : ''}$${i}${
      i !== comment.length ? ',' : ') RETURNING *'
    }`;
    if (typeof comment[i] === 'object') {
      comment[i] = JSON.stringify(comment[i]);
    }
  }
  const res = await client.query(query, comment);
  return res.rows;
};

const getComment = async (id) => {
  const res = await client.query(`SELECT * FROM "users_comments" WHERE id=$1`, [
    id,
  ]);
  return res.rows;
};

const putComment = async (data) => {
  const column = Object.keys(data);
  const fields = Object.values(data);
  column.splice(0, 1);
  fields.splice(0, 1);
  const res = await client.query(
    `UPDATE users_comments
	  SET (${column.join()}) = ('${fields.join("','")}')
	  WHERE id = $1
	  RETURNING *`,
    [data.id]
  );
  return res.rows;
};

const removeComment = async (id) => {
  const res = await client.query(
    `DELETE FROM users_comments WHERE id = $1
	RETURNING *`,
    [id]
  );
  return res.rows;
};

const tableHasRow = async () => {
  const res = await client.query(`SELECT * FROM users_comments`);
  return res.rows.length > 0;
};

module.exports = {
  fetchComments,
  addComment,
  getComment,
  putComment,
  removeComment,
  tableHasRow,
};
