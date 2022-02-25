const model = require('../models/comments.model');

const addComments = async (req, res, next) => {
  const ifTabRowExists = await model.tableHasRow();
  if (!ifTabRowExists) {
    const fetchedComments = await model.fetchComments();
    res.send(fetchedComments);
  } else {
    res.send('Comments already added');
  }
};

const addComment = async (req, res, next) => {
  const commentData = req.body;
  const result = await model.addComment(commentData);
  res.send(result);
};  

const getComment = async (req, res, next) => {
  const commentId = req.params.id;
  const result = await model.getComment(commentId);
  if (result.length) { 
    res.send(result);
  } else {
    res.status(404).send('There is not such a comment.');
  }
};

const putComment = async (req, res, next) => {
  const changedData = req.body;
  let result = await model.putComment(changedData);
  res.send(result);
};
const removeComment = async (req, res, next) => {
  const commentId = req.params.id;
  const result = await model.removeComment(commentId);
  if (result.length) {
    res.send(result);
  } else {
    res.status(404).send('There is not such a post.');
  }
};

module.exports = {
  addComments,
  addComment,
  getComment,
  putComment,
  removeComment,
};
