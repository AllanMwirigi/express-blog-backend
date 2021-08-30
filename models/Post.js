const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');

const Post = sequelize.define('Post', {
  // id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(60), allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false, },
  author: { type: DataTypes.STRING, allowNull: false } // TODO: foreign key 
}, {
  // Other model options go here
});

module.exports = Post;

// (async () => {
//   await sequelize.sync({ alter: true }); 
// NOT recommended for production; use migrations - https://sequelize.org/master/manual/migrations.html
// })();