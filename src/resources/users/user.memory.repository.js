const { db } = require('../../common/db');
const UserModel = require('./user.model');

const USER = 'Users';
const TASK = 'Tasks';
const USER_COLUMN = 'userId';

const getAll = async () => {
  return await db.getAll(USER).map(user => UserModel.toResponse(user));
};

const getByID = async id => {
  const user = await db.getByID(USER, id);
  if (user) {
    return UserModel.toResponse(user);
  }
  return [];
};

const getTasks = async id => {
  return db.getChildren(TASK, USER_COLUMN, id);
};

const addItem = async user => {
  return UserModel.toResponse(await db.addItem(USER, new UserModel(user)));
};

const updateItem = async (id, user) => {
  return UserModel.toResponse(await db.updateItem(USER, id, user));
};

const deleteItem = async id => {
  const tasks = await db.getChildren(TASK, USER_COLUMN, id);
  tasks.map(async task => {
    await updateItem(TASK, task.id, { userId: null });
  });
  return await db.deleteItem(USER, id);
};

module.exports = { getAll, getByID, getTasks, addItem, updateItem, deleteItem };
