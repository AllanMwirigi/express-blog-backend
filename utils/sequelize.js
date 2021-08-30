const { Sequelize } = require('sequelize');

const { MYSQL_DBNAME, MYSQL_USER, MYSQL_PASS } = process.env;

const sequelize = new Sequelize(MYSQL_DBNAME, MYSQL_USER, MYSQL_PASS, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,                        // Disables logging
  // logging: msg => logger.debug(msg),     // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
  // logging: logger.debug.bind(logger)
});

module.exports = sequelize;