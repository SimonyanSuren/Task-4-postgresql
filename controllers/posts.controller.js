const {
  fetchPosts,
  tableHasRow,
  addPostToDB,
  getPostFromDB,
  putPostFromDB,
  removePostFromDB,
} = require('../models/posts.model');

async function addPosts(req, res, next) {
  let boolean = await tableHasRow();
  if (!boolean) {
    const fetchedPosts = await fetchPosts();
    res.send(fetchedPosts);
  } else {
    res.send('Posts already added');
  }
}

async function addOnePost(req, res, next) {
  const postData = req.body;
  const userId = req.get('userId');
  const result = await addPostToDB(postData, userId);
  res.send(result);
}

async function getPost(req, res, next) {
  const postId = req.params.id;
  const result = await getPostFromDB(postId);
  if (result == false) {
    res.send('There is not such a post.');
  } else {
    res.send(result);
  }
}

async function putPost(req, res, next) {
  const postId = req.get('postId');
  const changedData = req.body;
  let result = await putPostFromDB(postId, changedData);
  result = Object.assign(result[0], changedData);
  res.send(result);
}

async function removePost(req, res, next) {
  const postId = req.params.id;
  const result = await removePostFromDB(postId);
  if (result == false) {
    res.send('There is not such a post.');
  } else {
    res.send(result);
  }
}

module.exports = { addPosts, addOnePost, getPost, putPost, removePost };
