const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');
const Post = require('./Post');
const User = require('./User');

const Comment = sequelize.define('Comment', {
  content: { type: DataTypes.TEXT, allowNull: false, },
  // userId: { type: DataTypes.INTEGER, allowNull: false }, // TODO: foreign key
  // postId: { type: DataTypes.INTEGER, allowNull: false } 
}, {});

Comment.belongsTo(Post);
Comment.belongsTo(User);

module.exports = Comment;