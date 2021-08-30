/* eslint-disable no-underscore-dangle */

const Post = require('../models/Post');

exports.createPost = async (req, res, next) => {
  try {
    const post = Post.build(req.body);
    await post.save();
    res.status(201).json({ postId: post.id });
  } catch (error) {
    next(error);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(id);
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
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const result = await Post.update(update, { where: { id } });
    if (result[0] === 0) {
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
    const { id } = req.params;
    const rows = await Post.destroy({ where: { id } });
    if (rows === 0) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
