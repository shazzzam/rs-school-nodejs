const router = require('express').Router();

const taskService = require('./task.service');
const { createTaskSchema, updateTaskSchema } = require('./task.validator');
const { errorCatcher, ErrorHandler } = require('../../common/error');

router.route('/').get(
  errorCatcher(async (req, res) => {
    const tasks = await taskService.getByBoardId(req.boardId);
    if (tasks.length) {
      res
        .set('Accept', 'application/json')
        .status(200)
        .contentType('application/json')
        .json(tasks);
    } else {
      throw new ErrorHandler(400, 'No tasks found');
    }
  })
);

router.route('/:id').get(
  errorCatcher(async (req, res) => {
    const task = await taskService.getById(req.params.id, req.boardId);
    if (task) {
      res
        .set('Accept', 'application/json')
        .status(200)
        .contentType('application/json')
        .json(task);
    } else {
      throw new ErrorHandler(404, 'Task not found');
    }
  })
);

router.route('/').post(
  errorCatcher(async (req, res) => {
    const { error, value } = createTaskSchema.validate(req.body);
    if (error) {
      throw new ErrorHandler(400, JSON.stringify(error.details, null, 2));
    } else {
      const task = await taskService.addItem(req.boardId, value);
      res
        .set('Accept', 'application/json')
        .contentType('application/json')
        .status(200)
        .json(task);
    }
  })
);

router.route('/:id').put(
  errorCatcher(async (req, res) => {
    const { error, value } = updateTaskSchema.validate(req.body);
    if (error) {
      throw new ErrorHandler(400, JSON.stringify(error.details, null, 2));
    } else {
      const task = await taskService.updateItem(req.params.id, value);
      res
        .set('Accept', 'application/json')
        .contentType('application/json')
        .status(200)
        .json(task);
    }
  })
);

router.route('/:id').delete(
  errorCatcher(async (req, res) => {
    const query_res = await taskService.deleteItem(req.params.id);
    if (query_res) {
      res
        .set('Accept', 'application/json')
        .status(204)
        .contentType('application/json')
        .json(req.body);
    } else {
      throw new ErrorHandler(404, 'No task to delete');
    }
  })
);

module.exports = router;
