const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../common/config');
const { ErrorHandler, errorCatcher } = require('../common/error');

const authMiddleware = allowed => {
  return errorCatcher((req, _res, next) => {
    if (allowed.includes(req.url)) {
      return next();
    }
    const token = req.headers.authorization;
    if (token) {
      // const isValid = true;
      // console.log(JWT_SECRET_KEY);
      const isValid = jwt.verify(token.slice(7), JWT_SECRET_KEY);
      if (isValid) {
        return next();
      }
    }
    throw new ErrorHandler(401, 'Unauthorized error');
  });
};

module.exports = { authMiddleware };
