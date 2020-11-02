const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

    userData.map(async user => {
      const newPass = await bcrypt.hash(user.password, 10);
      User({ ...user, password: newPass }).save();
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
