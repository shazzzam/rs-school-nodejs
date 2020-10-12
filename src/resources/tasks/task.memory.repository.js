const { db } = require('../../common/db');
const TaskModel = require('./task.model');

const TASK = 'Tasks';
const BOARD_COLUMN = 'boardId';

const getByBoardId = async id =>
  await db
    .getChildren(TASK, BOARD_COLUMN, id)
    .map(task => TaskModel.toResponse(task));

const getById = async (id, parentId) => {
  const task = await db.getByID(TASK, id);
  return task[BOARD_COLUMN] === parentId ? TaskModel.toResponse(task) : false;
};

const addItem = async (boardId, task) => {
  task[BOARD_COLUMN] = boardId;
  return TaskModel.toResponse(await db.addItem(TASK, new TaskModel(task)));
};

const updateItem = async (id, task) =>
  TaskModel.toResponse(await db.updateItem(TASK, id, task));

const deleteItem = async id => await db.deleteItem(TASK, id);

module.exports = {
  getByBoardId,
  getById,
  addItem,
  updateItem,
  deleteItem
};
