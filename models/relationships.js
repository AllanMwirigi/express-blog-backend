const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

module.exports = () => {
  User.hasMany(Post, {
    // foreignKey: { allowNull: false },
    as: 'posts',
    onDelete: 'CASCADE', // if user is deleted, their posts should be deleted as well
  });
  Post.belongsTo(User); // customize foreignKey name; would default to userId
  // Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' }); // customize foreignKey name; would default to userId
  
  User.hasMany(Comment, {
    // foreignKey: { allowNull: false },
    as: 'comments',
    onDelete: 'CASCADE', // if user is deleted, their comments should be deleted as well
  });
  Comment.belongsTo(User);

  
  Post.hasMany(Comment, {
    // foreignKey: { allowNull: false },
    as: 'comments',
    onDelete: 'CASCADE', // if post is deleted, comments should be deleted as well
  });
  Comment.belongsTo(Post);
}

