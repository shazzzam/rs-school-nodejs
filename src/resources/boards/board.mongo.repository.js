const { Board } = require('./board.model');
const { Task } = require('../tasks/task.model');

const getAll = async () => {
  const boards = await Board.find({});
  return boards.map(board => Board.toResponse(board));
};

const getByID = async id => {
  const board = await Board.findById(id);
  return board ? Board.toResponse(board) : null;
};

const addItem = async board => Board.toResponse(await Board.create(board));

const updateItem = async (id, board) => {
  const newBoard = await Board.updateOne({ _id: id }, board);
  return Board.toResponse(newBoard);
};

const deleteItem = async id => {
  await Task.deleteMany({ boardId: id });
  const boardDeleted = await Board.deleteOne({ _id: id });
  return !!boardDeleted;
};

module.exports = {
  getAll,
  getByID,
  addItem,
  updateItem,
  deleteItem
};
