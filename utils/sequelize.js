const { Sequelize } = require('sequelize');

const { MYSQL_HOST, MYSQL_DBNAME, MYSQL_USER, MYSQL_PASS } = process.env;

const sequelize = new Sequelize(MYSQL_DBNAME, MYSQL_USER, MYSQL_PASS, {
  host: MYSQL_HOST,
  dialect: 'mysql',
  logging: false,                        // Disables logging
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // logging: msg => logger.debug(msg),     // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
  // logging: logger.debug.bind(logger)
});

module.exports = sequelize;