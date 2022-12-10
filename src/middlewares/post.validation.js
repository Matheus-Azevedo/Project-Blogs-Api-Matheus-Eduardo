const status = require('../utils/status.code');
const categoriesService = require('../services/categories.services');
const postService = require('../services/post.services');

const allFielsPostValidation = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    return res
      .status(status.findStatus('BAD_REQUEST'))
      .json({ message: 'Some required fields are missing' });
  }
  next();
};

const categoryIdsValidation = async (req, res, next) => {
  const { categoryIds } = req.body;
  const categories = await categoriesService.getAllCategories();
  const categoriesIncludes = categoryIds.every((categoryId) => categories
    .some((category) => category.id === categoryId));
  if (!categoriesIncludes) {
    return res
      .status(status.findStatus('BAD_REQUEST'))
      .json({ message: 'one or more "categoryIds" not found' });
  }
  next();
};

const updatePostValidation = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title && !content) {
    return res
      .status(status.findStatus('BAD_REQUEST'))
      .json({ message: 'Some required fields are missing' });
  }
  next();
};

const postExistsValidation = async (req, res, next) => {
  const { id } = req.params;
  const post = await postService.getPostById(id);
  if (!post) {
    return res.status(status.findStatus('NOT_FOUND')).json({ message: 'Post does not exist' });
  }
  next();
};

const postUnauthorizedValidation = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const post = await postService.getPostById(id);
  if (post.user.id !== userId) {
    return res
      .status(status.findStatus('UNAUTHORIZED'))
      .json({ message: 'Unauthorized user' });
  }
  next();
};

module.exports = {
  allFielsPostValidation,
  categoryIdsValidation,
  updatePostValidation,
  postExistsValidation,
  postUnauthorizedValidation,
};