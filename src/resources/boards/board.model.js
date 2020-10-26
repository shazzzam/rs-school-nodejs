const uuid = require('uuid');
const mongoose = require('mongoose');

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

const columnSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: String,
  order: Number
});

const boardSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: String,
  columns: [columnSchema]
});

boardSchema.statics.toResponse = ({ id, title, columns }) => ({
  id,
  title,
  columns
});

const Board = mongoose.model('Board', boardSchema);

module.exports = {
  BoardModel,
  ColumnModel,
  Board
};
