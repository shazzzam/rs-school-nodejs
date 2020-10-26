const mongoose = require('mongoose');

const { User } = require('../resources/users/user.model');
const { Board } = require('../resources/boards/board.model');
const { Task } = require('../resources/tasks/task.model');
const { userData, boardData, taskData } = require('./db_data');

const { MONGO_CONNECTION_STRING } = require('./config');

const connectToDB = callback => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    db.dropDatabase();

    userData.map(user => {
      User(user).save();
    });

    boardData.map(board => {
      Board(board).save();
    });

    taskData.map(task => {
      Task(task).save();
    });
    callback();
  });
};

module.exports = { connectToDB };
