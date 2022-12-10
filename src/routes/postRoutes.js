const express = require('express');
const postController = require('../controllers/post.controller');
const { validateToken } = require('../authentication/JWT');
const { 
  categoryIdsValidation,
  allFielsPostValidation, 
  updatePostValidation,
  postExistsValidation,
  postUnauthorizedValidation,
} = require('../middlewares/post.validation');

// Router instance
const postRouter = express.Router();

// GET /post
postRouter.get('/', validateToken, postController.getAllPosts);

// GET /post/:id
postRouter.get('/:id', validateToken, postController.getPostById);

// PUT /post/:id
postRouter.put('/:id',
  validateToken,
  updatePostValidation,
  postExistsValidation,
  postUnauthorizedValidation,
  postController.updatePost);

// POST /post
postRouter.post('/',
  validateToken,
  allFielsPostValidation,
  categoryIdsValidation,
  postController.createPost);

// DELETE /post/:id
postRouter.delete('/:id',
  validateToken,
  postExistsValidation,
  postUnauthorizedValidation,
  postController.deletePost);

module.exports = postRouter;