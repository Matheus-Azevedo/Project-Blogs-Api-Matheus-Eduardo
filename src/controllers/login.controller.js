const status = require('../utils/status.code');
const { createToken } = require('../authentication/JWT');

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const token = createToken(email);
    return res.status(status.findStatus('REQUEST_OK')).json({ token });
  } catch (error) {
    return res.status(status.findStatus('BAD_REQUEST')).json({ message: error.message });
  }
};

module.exports = {
  login,
};