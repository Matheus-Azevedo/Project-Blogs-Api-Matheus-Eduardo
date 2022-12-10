const { User } = require('../models');

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const createUser = async (displayName, email, password, image) => {
  const user = await User.create({ displayName, email, password, image });
  return user;
};

const deleteMyUser = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  deleteMyUser,
};
