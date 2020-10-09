const uuid = require('uuid');

const { userData } = require('./db_data');
const UserModel = require('../resources/users/user.model');

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
      updatedItem = oldItem.id === id ? Object.assign(oldItem, item) : oldItem;
      return updatedItem;
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
    this[table] = this[table].filter(item => item[parentColumn] === parentId);
    return true;
  }
};

userData.map(user => {
  db.Users.push(new UserModel(user));
});

module.exports = {
  db
};
