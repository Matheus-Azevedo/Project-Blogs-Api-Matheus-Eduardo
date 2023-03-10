const express = require('express');
const { validateToken } = require('../authentication/JWT');
const { nameIsRequired } = require('../middlewares/categories.validation');
const categoriesController = require('../controllers/categories.controller');

// Router instance
const categoriesRouter = express.Router();

// GET /categories
categoriesRouter.get('/', validateToken, categoriesController.getAllCategories);

// POST /categories
categoriesRouter.post('/', validateToken, nameIsRequired, categoriesController.createCategory);

module.exports = categoriesRouter;