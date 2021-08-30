/* eslint-disable no-underscore-dangle */

const Post = require('../models/Post');

exports.createPost = async (req, res, next) => {
  try {
    const post = new Post(req.body);
    const doc = await post.save();
    res.status(201).json({ postId: doc._id });
  } catch (error) {
    next(error);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).lean().exec();
    if (!post) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).lean().exec();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const result = await Post.updateOne({ _id: id }, update).exec();
    if (result.n === 0) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const result = await Post.deleteOne({ _id: req.params.id }).exec();
    if (result.n === 0) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
