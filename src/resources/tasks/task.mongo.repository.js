const { Task } = require('./task.model');

const getByBoardId = async id => {
  const tasks = await Task.find({ boardId: id });
  return tasks.map(task => Task.toResponse(task));
};

const getById = async id => {
  const task = await Task.findById(id);
  return task ? Task.toResponse(task) : null;
};

const addItem = async (boardId, task) => {
  task.boardId = boardId;
  return Task.toResponse(await Task.create(task));
};

const updateItem = async (id, task) =>
  Task.toResponse(await Task.updateOne({ _id: id }, task));

const deleteItem = async id => {
  const taskDeleted = await Task.deleteOne({ _id: id });
  return !!taskDeleted;
};

module.exports = {
  getByBoardId,
  getById,
  addItem,
  updateItem,
  deleteItem
};
