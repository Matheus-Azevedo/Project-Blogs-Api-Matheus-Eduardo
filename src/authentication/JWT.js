// src/auth/validateJWT.js
const jwt = require('jsonwebtoken');

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

module.exports = {
  createToken,
  verifyToken,
};