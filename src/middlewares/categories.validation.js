const status = require('../utils/status.code');

const nameIsRequired = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(status.findStatus('BAD_REQUEST')).json({ message: '"name" is required' });
  }
  next();
};

module.exports = {
  nameIsRequired,
};