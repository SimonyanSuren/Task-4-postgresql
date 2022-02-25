const axios = require('axios');
const client = require('../db/connect');

async function fetchPosts() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/posts'
  );
  let counter = 1;
  let query = `INSERT INTO "users_posts" (id, title, body, user_id) VALUES`;
  const postData = response.data;
  const values = [];
  for (let i = 1; i <= postData.length; i++) {
    const post = postData[i - 1];
    query += ` ($${counter},$${counter + 1},$${counter + 2}, $${counter + 3})${
      i !== postData.length ? ',' : ' RETURNING *'
    }`;
    counter += 4;
    values.push(post.id);
    values.push(post.title);
    values.push(post.body);
    values.push(post.userId);
  }
 
  const res = await client.query(query, values);
  return res.rows;
}

async function addPostToDB(post, userId) {
  const lastPostId =
    await client.query(`SELECT id FROM users_posts ORDER BY id DESC LIMIT 1
	 `); 
  const lastId = lastPostId.rows[0].id + 1;
  let query = `INSERT INTO users_posts (title, body, id, user_id) VALUES`;
  post = Object.values(post);
  post.push(lastId, userId);
  for (let i = 1; i <= post.length; i++) {
    query += `${i === 1 ? ' (' : ''}$${i}${
      i !== post.length ? ',' : ') RETURNING *'
    }`;
    if (typeof post[i] === 'object') {
      post[i] = JSON.stringify(post[i]);
    }
  }
  const res = await client.query(query, post);
  return res.rows;
}
  
async function getPostFromDB(id) {
  const res = await client.query(`SELECT * FROM "users_posts" WHERE id=$1`, [id]);
  return res.rows;
}

async function putPostFromDB( data) {
  const column = Object.keys(data);
  const fields = Object.values(data);
  column.splice(0,1);
  fields.splice(0,1);
  const res = await client.query(`UPDATE users_posts
	 SET (${column.join()}) = ('${fields.join("','")}')
	 WHERE id = $1
	 RETURNING *`, [data.id]);
  return res.rows;
}
 
async function removePostFromDB(id) {
  const res = await client.query(`DELETE FROM users_posts WHERE id = $1
	RETURNING *`, [id]);
  return res.rows;
}

async function tableHasRow() {
  const res = await client.query(
    `SELECT * FROM users_posts`
  );
  return res.rows.length > 0;
}

async function getPostandCommnetsFromDB(id) {
	const comments = await client.query(`Select * from "users_comments" uc 
	WHERE uc."post_id"= $1`, [id]);
	const post = await client.query(`Select * from "users_posts" 
	WHERE id= $1`, [id]);
	post.rows[0]['comments'] = comments.rows
	return post.rows;
 }

module.exports = {
  fetchPosts,
  tableHasRow,
  addPostToDB,
  getPostFromDB,
  putPostFromDB,
  removePostFromDB,
  getPostandCommnetsFromDB
};
