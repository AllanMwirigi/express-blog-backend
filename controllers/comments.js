/* eslint-disable no-underscore-dangle */

const Comment = require('../models/Comment');

exports.createComment = async (req, res, next) => {
  try {
    const post = new Comment(req.body);
    const doc = await post.save();
    res.status(201).json({ postId: doc._id });
  } catch (error) {
    next(error);
  }
};

exports.getCommentsOfPost = async (req, res, next) => {
  try {
    const post = await Comment.findById(req.params.postId).lean().exec();
    if (!post) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const result = await Comment.updateOne({ _id: id }, update).exec();
    if (result.n === 0) {
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
    const result = await Comment.deleteOne({ _id: req.params.id }).exec();
    if (result.n === 0) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
