const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');
const Comment = require('./Comment');
const User = require('./User');

const Post = sequelize.define('Post', {
  // id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(60), allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false, },
  // author: { type: DataTypes.INTEGER, allowNull: false } // TODO: foreign key
}, {
  // Other model options go here
});

Post.hasMany(Comment, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE', // if post is deleted, comments should be deleted as well
});
Post.belongsTo(User, { foreignKey: 'authorId' }); // customize foreignKey name; would default to userId

module.exports = Post;