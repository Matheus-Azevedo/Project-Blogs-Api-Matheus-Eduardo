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

// GET /user
usersRouter.get('/', validateToken, userController.getAllUsers);

// GET /user/:id
usersRouter.get('/:id', validateToken, userController.getUserById);

// POST /user
usersRouter.post('/',
  dispplayNameValidation,
  emailValidation,
  passwordValidation,
  userController.createUser);

// DELETE /user/me
usersRouter.delete('/:id', validateToken, userController.deleteMyUser);

module.exports = usersRouter;