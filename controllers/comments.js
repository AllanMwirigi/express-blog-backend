/* eslint-disable no-underscore-dangle */

const Comment = require('../models/Comment');

exports.createComment = async (req, res, next) => {
  try {
    const comment = Comment.build(req.body);
    await comment.save();
    res.status(201).json({ commentId: comment.id });
  } catch (error) {
    next(error);
  }
};

exports.getCommentsOfPost = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({ where: { postId: req.params.postId } });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const result = await Comment.update(update, { where: { id } })
    if (result[0] === 0) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const rows = await Comment.destroy({ where: { id: req.params.id }});
    if (rows === 0) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
