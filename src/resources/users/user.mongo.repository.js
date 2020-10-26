const { User } = require('./user.model');
const { Task } = require('../tasks/task.model');

const getAll = async () => {
  const users = await User.find({});
  return users.map(user => User.toResponse(user));
};

const getByID = async id => User.toResponse(await User.findById(id));

const getTasks = async id => Task.toResponse(await Task.find({ userId: id }));

const addItem = async user => User.toResponse(await User.create(user));

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

module.exports = { getAll, getByID, getTasks, addItem, updateItem, deleteItem };
