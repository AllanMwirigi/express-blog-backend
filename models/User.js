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

module.exports = User;