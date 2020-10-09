const uuid = require('uuid');

class BoardModel {
  constructor({ id = uuid(), title = 'Board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

class ColumnModel {
  constructor({ id = uuid(), title = 'ToDo', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = {
  BoardModel,
  ColumnModel
};
