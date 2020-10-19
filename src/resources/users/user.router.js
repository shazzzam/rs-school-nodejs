const router = require('express').Router();

const usersService = require('./user.service');
const { createUserSchema, updateUserSchema } = require('./user.validator');
const { ErrorHandler, errorCatcher } = require('../../common/error');

router.route('/').get(
  errorCatcher(async (_req, res) => {
    // throw new Error('Unknown error');
    // throw new ErrorHandler(500, 'Internal sever error');
    const users = await usersService.getAll();
    if (users.length) {
      res
        .set('Accept', 'application/json')
        .status(200)
        .contentType('application/json')
        .json(users);
    } else {
      throw new ErrorHandler(404, 'No users found');
    }
  })
);

router.route('/:id').get(
  errorCatcher(async (req, res) => {
    const user = await usersService.getByID(req.params.id);
    if (user) {
      res
        .set('Accept', 'application/json')
        .status(200)
        .contentType('application/json')
        .json(user);
    } else {
      throw new ErrorHandler(404, 'User not found');
    }
  })
);

router.route('/').post(
  errorCatcher(async (req, res) => {
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
      throw new ErrorHandler(400, JSON.stringify(error.details, null, 2));
    } else {
      const user = await usersService.addItem(value);
      res
        .set('Accept', 'application/json')
        .contentType('application/json')
        .status(200)
        .json(user);
    }
  })
);

router.route('/:id').put(
  errorCatcher(async (req, res) => {
    const { error, value } = updateUserSchema.validate(req.body);
    if (error) {
      throw new ErrorHandler(400, JSON.stringify(error.details, null, 2));
    } else {
      const user = await usersService.updateItem(req.params.id, value);
      res
        .set('Accept', 'application/json')
        .contentType('application/json')
        .status(200)
        .json(user);
    }
  })
);

router.route('/:id').delete(
  errorCatcher(async (req, res) => {
    const query_res = await usersService.deleteItem(req.params.id);
    if (query_res) {
      res
        .set('Accept', 'application/json')
        .status(204)
        .contentType('application/json')
        .json(req.body);
    } else {
      throw new ErrorHandler(404, 'No user to delete');
    }
  })
);

module.exports = router;
