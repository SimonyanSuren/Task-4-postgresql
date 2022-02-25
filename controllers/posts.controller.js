const {
  fetchPosts,
  tableHasRow,
  addPostToDB,
  getPostFromDB,
  putPostFromDB,
  removePostFromDB,
  getPostandCommnetsFromDB
} = require('../models/posts.model');

async function addPosts(req, res, next) {
  const ifTabRowExists = await tableHasRow();
  if (!ifTabRowExists) {
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
	req.status()
  const postId = req.params.id;
  const result = await getPostFromDB(postId);
  if (result.length) {
    res.send(result);
  } else {
    res.status(404).send('There is not such a post.');
  }
}

async function putPost(req, res, next) {
  const changedData = req.body;
  let result = await putPostFromDB(changedData);
  res.send(result);
}

async function removePost(req, res, next) {
  const postId = req.params.id;
  const result = await removePostFromDB(postId);
  if (result.length) {
    res.send(result); 
  } else {
   res.status(404).send('There is not such a post.');
  }
}

async function getPostandCommnets (req, res, next) {
	const postId = req.params.id;
  const result = await getPostandCommnetsFromDB(postId);
  if (result.length) {
    res.send(result);
  } else {
    res.status(404).send('There is not such a post.');
  }
}

module.exports = { addPosts, addOnePost, getPost, putPost, removePost, getPostandCommnets };
