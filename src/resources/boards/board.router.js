const router = require('express').Router();

const boardService = require('./board.service');
const { createBoardSchema, updateBoardSchema } = require('./board.validator');

router.route('/').get(async (_req, res) => {
  const boards = await boardService.getAll();
  res
    .set('Accept', 'application/json')
    .status(200)
    .contentType('application/json')
    .json(boards);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardService.getByID(req.params.id);
  res
    .set('Accept', 'application/json')
    .status(board ? 200 : 404)
    .contentType('application/json')
    .json(board);
});

router.route('/').post(async (req, res) => {
  const { error, value } = createBoardSchema.validate(req.body);
  res.set('Accept', 'application/json').contentType('application/json');
  if (error) {
    res.status(400).json({ error });
  } else {
    const board = await boardService.addItem(value);
    res.status(200).json(board);
  }
});

router.route('/:id').put(async (req, res) => {
  const { error, value } = updateBoardSchema.validate(req.body);
  res.set('Accept', 'application/json').contentType('application/json');
  if (error) {
    res.status(400).json({ error });
  } else {
    const board = await boardService.updateItem(req.params.id, value);
    console.log(req.params.id);
    console.log(board);
    res.status(200).json(board);
  }
});

router.route('/:id').delete(async (req, res) => {
  const query_res = await boardService.deleteItem(req.params.id);
  res
    .set('Accept', 'application/json')
    .status(query_res ? 204 : 404)
    .contentType('application/json')
    .json(req.body);
});

module.exports = router;
