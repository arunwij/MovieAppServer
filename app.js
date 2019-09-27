const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

/**
 * routes
 */
const { userRoutes, authRoutes } = require('./routes');
const apiRouter = express.Router();
const app = express();

/**
 * middlewares
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

apiRouter.use('/users', userRoutes);
apiRouter.use('/auth', authRoutes);

module.exports = app;
