const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// require('dotenv').config();
require('dotenv-extended').load({ 
  schema: '.env.schema', errorOnMissing: true, silent: true,
  includeProcessEnv: true, overrideProcessEnv: true
});
const sequelize = require('./utils/sequelize');
const logger = require('./utils/winston');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const userRoutes = require('./routes/users');
const initRelationships = require('./models/relationships');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  try {
    await sequelize.authenticate();
    initRelationships();
    if (process.env.NODE_ENV === 'development') {
      // await sequelize.sync({ force: true });
      await sequelize.sync({ alter: true }); 
      // NOT recommended for production; use migrations - https://sequelize.org/master/manual/migrations.html
    }
    logger.info('Database connected');
    const PORT = process.env.PORT || 4000;
    app.listen(PORT).on('listening', () => logger.info(`Server listening on Port ${PORT} | Env: ${process.env.NODE_ENV}`))
      .on('error', (err) => { logger.error(`Server | ${err.message}`); 
    });
  } catch (error) {
    logger.error(`Database Error: ${error.message}`);
    console.error(error);
  }
})();

// map endpoint path to route file
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/users', userRoutes);

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
  // otherwise handle it here
  // set status to the status code of the error, otherwise 500 is default e.g. for db errors
  res.status(err.status || 500);
  res.set({ 'Content-type': 'application/json' });
  res.json({ message: err.message });
  logger.error(`${req.url} | ${err.message}`);
});