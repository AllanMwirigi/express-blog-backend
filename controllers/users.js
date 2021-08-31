const User = require('../models/User');
const Post = require('../models/Post');

exports.createUser = async (req, res, next) => {
  try {
    const user = User.build(req.body);
    await user.save();
    res.status(201).json({ userId: user.id });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const user = await User.findByPk(id, { include: Post });
    const user = await User.findByPk(id, { include: ['posts'] });
    // console.log('user', id, user);
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const result = await User.update(update, { where: { id } });
    if (result[0] === 0) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await User.destroy({ where: { id } });
    if (rows === 0) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
