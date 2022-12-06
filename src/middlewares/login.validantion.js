const userServices = require('../services/user.services');
const status = require('../utils/status.code');

const loginNotBeEmpty = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(status.findStatus('BAD_REQUEST'))
      .json({ message: 'Some required fields are missing' });
  }
  next();
};

const toLoginUserMustBeExist = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userServices.getUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(status.findStatus('BAD_REQUEST')).json({ message: 'Invalid fields' });
  }
  next();
};

module.exports = {
  loginNotBeEmpty,
  toLoginUserMustBeExist,
};