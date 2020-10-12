const uuid = require('uuid');

const { userData, boardData, taskData } = require('./db_data');
const UserModel = require('../resources/users/user.model');
const { ColumnModel, BoardModel } = require('../resources/boards/board.model');
const TaskModel = require('../resources/tasks/task.model');

const db = {
  Users: [],
  Boards: [],
  Tasks: [],
  getByID(table, id) {
    const res = this[table].filter(item => item.id === id);
    return res.length ? res[0] : false;
  },

  getAll(table) {
    return this[table];
  },

  getChildren(childTable, parentColumn, parentId) {
    const res = this[childTable].filter(
      item => item[parentColumn] === parentId
    );
    return res.length ? res : [];
  },

  addItem(table, item) {
    item.id = uuid();
    this[table].push(item);
    return item;
  },

  updateItem(table, id, item) {
    let updatedItem = item;
    this[table] = this[table].map(oldItem => {
      if (oldItem.id === id) {
        updatedItem = Object.assign(oldItem, item);
        return updatedItem;
      }
      return oldItem;
    });
    return updatedItem;
  },

  deleteItem(table, id) {
    let deleteted = false;
    this[table] = this[table].filter(item => {
      if (item.id !== id) {
        return true;
      }
      deleteted = true;
      return false;
    });
    return deleteted;
  },

  deleteChildren(table, parentColumn, parentId) {
    this[table] = this[table].filter(item => item[parentColumn] !== parentId);
    return true;
  }
};

userData.map(user => {
  db.Users.push(new UserModel(user));
});

boardData.map(board => {
  board.columns = board.columns.map(column => new ColumnModel(column));
  db.Boards.push(new BoardModel(board));
});

taskData.map(task => {
  db.Tasks.push(new TaskModel(task));
});

module.exports = {
  db
};
