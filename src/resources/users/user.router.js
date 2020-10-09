const router = require('express').Router();
const usersService = require('./user.service');
const { createUserSchema, updateUserSchema } = require('./user.validator');

router.route('/').get(async (_req, res) => {
  const users = await usersService.getAll();
  res
    .set('Accept', 'application/json')
    .status(200)
    .contentType('application/json')
    .json(users);
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getByID(req.params.id);
  res
    .set('Accept', 'application/json')
    .status(user ? 200 : 404)
    .contentType('application/json')
    .json(user);
});

router.route('/').post(async (req, res) => {
  const { error, value } = createUserSchema.validate(req.body);
  res.set('Accept', 'application/json').contentType('application/json');
  if (error) {
    res.status(400).json({ error });
  } else {
    const user = await usersService.addItem(value);
    res.status(200).json(user);
  }
});

router.route('/:id').put(async (req, res) => {
  const { error, value } = updateUserSchema.validate(req.body);
  res.set('Accept', 'application/json').contentType('application/json');
  if (error) {
    res.status(400).json({ error });
  } else {
    const user = await usersService.updateItem(req.params.id, value);
    res.status(200).json(user);
  }
});

router.route('/:id').delete(async (req, res) => {
  const query_res = await usersService.deleteItem(req.params.id);
  res
    .set('Accept', 'application/json')
    .status(query_res ? 204 : 404)
    .contentType('application/json')
    .json(req.body);
});

module.exports = router;
