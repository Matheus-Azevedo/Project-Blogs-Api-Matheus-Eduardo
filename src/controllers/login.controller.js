const status = require('../utils/status.code');
const loginService = require('../services/login.services');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginService.login(email, password);
    return res.status(status.findStatus('REQUEST_OK')).json({ token });
  } catch (error) {
    return res.status(status.findStatus('INTERNAL_SERVER_ERROR')).json({ message: error.message });
  }
};

module.exports = {
  login,
};