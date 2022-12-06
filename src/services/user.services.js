const { User } = require('../models');

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id } });
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

module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
};
