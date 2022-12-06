const jwt = require('jsonwebtoken');
const status = require('../utils/status.code'); 
require('dotenv/config');

// Secret key
const secret = process.env.JWT_SECRET;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '30min',
};

const createToken = (userEmail) => {
  const token = jwt.sign({ data: userEmail }, secret, jwtConfig);
  return token;
};

const verifyToken = async (authorization) => {
  try {
    const payLoad = jwt.verify(authorization, secret);
    return payLoad;
  } catch (error) {
    return { isError: true, message: error.message };
  }
};

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(status.findStatus('UNAUTHORIZED'))
      .json({ message: 'Token not found' });
  }
  const payLoad = await verifyToken(authorization);
  if (payLoad.isError) {
    return res
      .status(status.findStatus('UNAUTHORIZED'))
      .json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = {
  createToken,
  verifyToken,
  validateToken,
};