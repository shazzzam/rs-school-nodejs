const morgan = require('morgan');
const fs = require('fs');

morgan.token('body', req => JSON.stringify(req.body, null, 2));
morgan.token('params', req => {
  if (req.boardId) {
    req.params.boardId = req.boardId;
  }
  return JSON.stringify(req.params);
});
morgan.token('date', () => new Date());
morgan.token('error', (_req, res) => res.error);

const logger = morgan(
  '----------\n :date\n:method on :url done in :response-time ms with query params :params and request body\n :body \n----------',
  {
    stream: fs.createWriteStream('access.log', { flags: 'a', encoding: 'utf8' })
  }
);

const errorMorgan = morgan(
  '----------\n ERRROR :error \n:date\n:method on :url with query params :params and request body\n :body \n----------',
  {
    stream: fs.createWriteStream('error.log', { flags: 'a', encoding: 'utf8' }),
    skip: req => req.message
  }
);

const errorLogger = (err, req, res, next) => {
  next(err);
  return errorMorgan(req, res, next);
};

const processErrorLogger = error => {
  fs.writeFileSync('process-error.log', `${new Date()} - ${error.message}\n`, {
    flag: 'a',
    encoding: 'utf8'
  });
};

module.exports = { logger, errorLogger, processErrorLogger };
