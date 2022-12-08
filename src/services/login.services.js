const { User } = require('../models');
const { createToken } = require('../authentication/JWT');

const login = async (email) => {
  const user = await User.findOne({ where: { email }, attributes: { exclude: ['password'] } });
  const token = createToken(user.dataValues);
  return token;
};

module.exports = {
  login,
};