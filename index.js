const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
const sequelize = require('./utils/sequelize');
const logger = require('./utils/winston');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const { MYSQL_DBNAME, MYSQL_USER, MYSQL_PASS } = process.env;

// const sequelize = new Sequelize(MYSQL_DBNAME, MYSQL_USER, MYSQL_PASS, {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: false,                        // Disables logging
//   // logging: msg => logger.debug(msg),     // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
//   // logging: logger.debug.bind(logger)
// });

try {
  await sequelize.authenticate();
  logger.info('Database connected');
  const PORT = process.env.PORT || 4000;
  app.listen(PORT).on('listening', () => logger.info('Server listening'))
    .on('error', (err) => { logger.error(`Server | ${err.message}`); });
} catch (error) {
  logger.error(`Unable to connect to the database: ${error.message}`);
}

// map endpoint path to route file
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/comments', commentRoutes);

// any invalid endpoints that don't match the above are handled here
app.use((req, res, next) => {
  if (res.headersSent) {
    // express handles this if headers had already been sent and sth went wrong
    next();
    return;
  }
  // otherwise we handle it
  // make a new error instance and forward it to the error-handler using next()
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// custom error handling middleware i.e. for errors passed in next(error)
app.use((err, req, res, next) => {
  // TODO:log these errors
  if (res.headersSent) {
    // express handles the error if headers had already been sent and sth went wrong
    next(err);
    logger.error(`${req.url} | ${err.message}`);
    return;
  }
  // otherwise we handle it
  // set status to the status code of the error, otherwise 500 is default e.g. for db errors
  res.status(err.status || 500);
  res.set({ 'Content-type': 'application/json' });
  res.json({ message: err.message });
  logger.error(`${req.url} | ${err.message}`);
});