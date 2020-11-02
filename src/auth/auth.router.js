const router = require('express').Router();

const authService = require('./auth.service');
const { ErrorHandler, errorCatcher } = require('../common/error');

router.route('/').post(
  errorCatcher(async (req, res) => {
    const token = await authService.getToken({
      login: req.body.login,
      password: req.body.password
    });
    if (token) {
      res.status(200).send({ token });
    } else {
      throw new ErrorHandler(403, 'Forbidden');
    }
  })
);

module.exports = router;
