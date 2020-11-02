const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../common/config');
const userService = require('../resources/users/user.service');

const getToken = async ({ login, password }) => {
  const user = await userService.getByLogin(login);
  if (user) {
    const isAuth = await bcrypt.compare(password, user.password);
    if (isAuth) {
      return jwt.sign(
        {
          userId: user.id,
          login: user.login
        },
        JWT_SECRET_KEY
      );
    }
  }
  return false;
};

module.exports = { getToken };
