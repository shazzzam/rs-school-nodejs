class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res, next) => {
  const { statusCode, message } = err;
  res.error = message;
  res.status(statusCode).json({
    status: 'error',
    statusCode: statusCode ? statusCode : 500,
    message
  });
  next(err);
};

const errorCatcher = callback => async (req, res, next) => {
  try {
    return await callback(req, res, next);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  ErrorHandler,
  handleError,
  errorCatcher
};
