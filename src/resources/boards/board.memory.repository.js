const { db } = require('../../common/db');
const { BoardModel, ColumnModel } = require('./board.model');

const BOARD = 'Boards';
const TASK = 'Tasks';
const BOARD_COLUMN = 'boardId';

const getAll = async () => await db.getAll(BOARD);

const getByID = async id => {
  const board = await db.getByID(BOARD, id);
  return board ? board : false;
};

const addItem = async board => {
  board.columns = board.columns.map(column => new ColumnModel(column));
  return await db.addItem(BOARD, new BoardModel(board));
};

const updateItem = async (id, board) => {
  board.columns = board.columns.map(column => new ColumnModel(column));
  return await db.updateItem(BOARD, id, board);
};

const deleteItem = async id => {
  await db.deleteChildren(TASK, BOARD_COLUMN, id);
  return await db.deleteItem(BOARD, id);
};

module.exports = {
  getAll,
  getByID,
  addItem,
  updateItem,
  deleteItem
};
