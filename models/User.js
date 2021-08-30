const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');
const Post = require('./Post');
const Comment = require('./Comment');

const User = sequelize.define('User', {
  firstName: { type: DataTypes.STRING(60), allowNull: false },
  lastName: { type: DataTypes.STRING(60), allowNull: false, },
  email: { type: DataTypes.STRING(20), allowNull: false, },
  phoneNo: { type: DataTypes.STRING(20), allowNull: false, },
  bio: { type: DataTypes.TEXT, allowNull: false, },
});

User.hasMany(Post, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE', // if user is deleted, their posts should be deleted as well
});

User.hasMany(Comment, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE', // if user is deleted, their comments should be deleted as well
});

module.exports = User;