const express = require('express');
const { validateToken } = require('../authentication/JWT');
const userController = require('../controllers/user.controller');
const { 
  dispplayNameValidation, 
  emailValidation, 
  passwordValidation,
} = require('../middlewares/user.validation');

// Router instance
const usersRouter = express.Router();

// GET /users
usersRouter.get('/', validateToken, userController.getAllUsers);

// POST /users
usersRouter.post('/',
  dispplayNameValidation,
  emailValidation,
  passwordValidation,
  userController.createUser);

module.exports = usersRouter;