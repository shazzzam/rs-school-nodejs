const router = require('express').Router();

const taskService = require('./task.service');
const { createTaskSchema, updateTaskSchema } = require('./task.validator');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getByBoardId(req.boardId);
  res
    .set('Accept', 'application/json')
    .status(tasks.length ? 200 : 400)
    .contentType('application/json')
    .json(tasks);
});

router.route('/:id').get(async (req, res) => {
  const task = await taskService.getById(req.params.id, req.boardId);
  res
    .set('Accept', 'application/json')
    .status(task ? 200 : 404)
    .contentType('application/json')
    .json(task);
});

router.route('/').post(async (req, res) => {
  const { error, value } = createTaskSchema.validate(req.body);
  res.set('Accept', 'application/json').contentType('application/json');
  if (error) {
    res.status(400).json({ error });
  } else {
    const task = await taskService.addItem(req.boardId, value);
    res.status(200).json(task);
  }
});

router.route('/:id').put(async (req, res) => {
  const { error, value } = updateTaskSchema.validate(req.body);
  res.set('Accept', 'application/json').contentType('application/json');
  if (error) {
    res.status(400).json({ error });
  } else {
    const task = await taskService.updateItem(req.params.id, value);
    res.status(200).json(task);
  }
});

router.route('/:id').delete(async (req, res) => {
  const query_res = await taskService.deleteItem(req.params.id);
  res
    .set('Accept', 'application/json')
    .status(query_res ? 204 : 404)
    .contentType('application/json')
    .json(req.body);
});

module.exports = router;
