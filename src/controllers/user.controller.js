const status = require('../utils/status.code');
const userService = require('../services/user.services');
const { createToken } = require('../authentication/JWT');

const getAllUsers = async (_req, res) => {
  try {
    const users = await userService.getAllUsers();
    console.log('AQUI ESTÁ O RESULTADO', users);
    return res.status(status.findStatus('REQUEST_OK')).json(users);
  } catch (error) {
    return res.status(status.findStatus('INTERNAL_SERVER_ERROR')).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(status.findStatus('NOT_FOUND')).json({ message: 'User does not exist' });
    }
    return res.status(status.findStatus('REQUEST_OK')).json(user);
  } catch (error) {
    return res.status(status.findStatus('INTERNAL_SERVER_ERROR')).json({ message: error.message });
  }
};

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
  getAllUsers,
  getUserById,
  createUser,
};