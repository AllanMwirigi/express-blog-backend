const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');

const Comment = sequelize.define('Comment', {
  content: { type: DataTypes.TEXT, allowNull: false, },
  userId: { type: DataTypes.INTEGER, allowNull: false }, // TODO: foreign key
  postId: { type: DataTypes.INTEGER, allowNull: false } 
}, {
  // Other model options go here
});

module.exports = Comment;