const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { handleError } = require('./common/error');
const { logger, errorLogger, processErrorLogger } = require('./common/logger');
const { authMiddleware } = require('./auth/auth.middleware');
const authRouter = require('./auth/auth.router');

process.on('uncaughtException', processErrorLogger);
process.on('unhandledRejection', processErrorLogger);

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(logger);
app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(authMiddleware(['/', '/login', '/doc']));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', authRouter);
app.use('/users', userRouter);
boardRouter.use(
  '/:boardId/tasks',
  (req, _res, next) => {
    req.boardId = req.params.boardId;
    next();
  },
  taskRouter
);
app.use('/boards', boardRouter);
app.use((err, _req, res, next) => {
  handleError(err, res, next);
});
app.use((err, res, req, next) => errorLogger(err, res, req, next));
app.use(() => {});

// throw Error('Oops! uncaughtException')
// Promise.reject(Error('Oops! unhandledRejection'))

module.exports = app;
