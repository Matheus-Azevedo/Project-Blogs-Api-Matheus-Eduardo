const express = require('express');
const userController = require('../controllers/user.controller');
const { 
  dispplayNameValidation, 
  emailValidation, 
  passwordValidation,
} = require('../middlewares/user.validation');

// Router instance
const usersRouter = express.Router();

// POST /users
usersRouter.post('/',
  dispplayNameValidation,
  emailValidation,
  passwordValidation,
  userController.createUser);

module.exports = usersRouter;