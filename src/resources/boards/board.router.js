const router = require('express').Router();

const boardService = require('./board.service');
const { createBoardSchema, updateBoardSchema } = require('./board.validator');
const { errorCatcher, ErrorHandler } = require('../../common/error');

router.route('/').get(
  errorCatcher(async (_req, res) => {
    const boards = await boardService.getAll();
    res
      .set('Accept', 'application/json')
      .status(200)
      .contentType('application/json')
      .json(boards);
  })
);

router.route('/:id').get(
  errorCatcher(async (req, res) => {
    const board = await boardService.getByID(req.params.id);
    if (board) {
      res
        .set('Accept', 'application/json')
        .status(200)
        .contentType('application/json')
        .json(board);
    } else {
      throw new ErrorHandler(404, 'Board not found');
    }
  })
);

router.route('/').post(
  errorCatcher(async (req, res) => {
    const { error, value } = createBoardSchema.validate(req.body);
    if (error) {
      throw new ErrorHandler(400, JSON.stringify(error.details, null, 2));
    } else {
      const board = await boardService.addItem(value);
      res
        .set('Accept', 'application/json')
        .contentType('application/json')
        .status(200)
        .json(board);
    }
  })
);

router.route('/:id').put(
  errorCatcher(async (req, res) => {
    const { error, value } = updateBoardSchema.validate(req.body);
    if (error) {
      throw new ErrorHandler(400, JSON.stringify(error.details, null, 2));
    } else {
      const board = await boardService.updateItem(req.params.id, value);
      res
        .set('Accept', 'application/json')
        .contentType('application/json')
        .status(200)
        .json(board);
    }
  })
);

router.route('/:id').delete(
  errorCatcher(async (req, res) => {
    const query_res = await boardService.deleteItem(req.params.id);
    if (query_res) {
      res
        .set('Accept', 'application/json')
        .status(204)
        .contentType('application/json')
        .json(req.body);
    } else {
      throw new ErrorHandler(404, 'No board to delete');
    }
  })
);

module.exports = router;
