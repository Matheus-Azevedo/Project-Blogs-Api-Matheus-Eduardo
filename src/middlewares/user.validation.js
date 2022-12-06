const status = require('../utils/status.code');
const userService = require('../services/user.services');

const dispplayNameValidation = async (req, res, next) => {
  const { displayName } = req.body;
  if (!displayName || displayName.length < 8) {
    return res
      .status(status.findStatus('BAD_REQUEST'))
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  next();
};

const emailValidation = async (req, res, next) => {
  const { email } = req.body;
  if (await userService.getUserByEmail(email)) {
    return res
      .status(status.findStatus('CONFLICT'))
      .json({ message: 'User already registered' });
  }
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!email || !emailRegex.test(email)) {
    return res
      .status(status.findStatus('BAD_REQUEST'))
      .json({ message: '"email" must be a valid email' });
  }
  next();
};

const passwordValidation = async (req, res, next) => {
  const { password } = req.body;
  const passwordMinimumLength = 6;
  if (!password || password.length < passwordMinimumLength) {
    return res
      .status(status.findStatus('BAD_REQUEST'))
      .json({ message: '"password" length must be at least 6 characters long' });
  }
  next();
};

module.exports = {
  dispplayNameValidation,
  emailValidation,
  passwordValidation,
};
