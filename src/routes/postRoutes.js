const express = require('express');
const postController = require('../controllers/post.controller');
const { validateToken } = require('../authentication/JWT');
const { categoryIdsValidation, allFielsPostValidation } = require('../middlewares/post.validation');

// Router instance
const postRouter = express.Router();

// GET /post
postRouter.get('/', validateToken, postController.getAllPosts);

// POST /post
postRouter.post('/',
  validateToken,
  allFielsPostValidation,
  categoryIdsValidation,
  postController.createPost);

module.exports = postRouter;