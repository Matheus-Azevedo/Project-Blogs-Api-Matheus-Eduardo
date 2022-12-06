const express = require('express');
const loginController = require('../controllers/login.controller');
const { loginNotBeEmpty, toLoginUserMustBeExist } = require('../middlewares/login.validantion');

// Router instance
const loginRouter = express.Router();

// POST /login
loginRouter.post('/', loginNotBeEmpty, toLoginUserMustBeExist, loginController.login);

module.exports = loginRouter;