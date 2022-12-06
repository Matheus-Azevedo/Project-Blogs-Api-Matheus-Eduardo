const status = require('../utils/status.code');
const userService = require('../services/user.services');
const { createToken } = require('../authentication/JWT');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    await userService.createUser(displayName, email, password, image);
    const token = createToken(email);
    return res.status(status.findStatus('REQUEST_CREATED')).json({ token });
  } catch (error) {
    return res.status(status.findStatus('INTERNAL_SERVER_ERROR')).json({ message: error.message });
  }
};

module.exports = {
  createUser,
};