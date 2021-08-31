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
    // const comments = await Comment.findAll({ where: { postId: req.params.postId }, raw: true });
    // Sequelize automatically wraps everything in proper instance objects. In a few cases, when there are too many results, this wrapping can be inefficient. To disable this wrapping and receive a plain response instead, pass { raw: true } as an option to the finder method. 
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

exports.getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.findAll();
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
