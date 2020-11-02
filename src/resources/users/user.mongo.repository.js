const bcrypt = require('bcrypt');
const { User } = require('./user.model');
const { Task } = require('../tasks/task.model');

const getAll = async () => {
  const users = await User.find({});
  return users.map(user => User.toResponse(user));
};

const getByID = async id => User.toResponse(await User.findById(id));

const getByLogin = async login => await User.findOne({ login });

const getTasks = async id => Task.toResponse(await Task.find({ userId: id }));

const addItem = async user => {
  const newPass = await bcrypt.hash(user.password, 10);
  return User.toResponse(await User.create({ ...user, password: newPass }));
};

const updateItem = async (id, user) =>
  User.toResponse(await User.updateOne({ _id: id }, user));

const deleteItem = async id => {
  const tasks = await Task.find({ userId: id });
  tasks.map(task => {
    task.userId = null;
    task.save();
  });
  const userDeleted = await User.deleteOne({ _id: id });
  return !!userDeleted;
};

module.exports = {
  getAll,
  getByID,
  getByLogin,
  getTasks,
  addItem,
  updateItem,
  deleteItem
};
