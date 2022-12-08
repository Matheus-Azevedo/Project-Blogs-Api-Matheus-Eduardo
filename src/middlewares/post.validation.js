const status = require('../utils/status.code');
const categoriesService = require('../services/categories.services');

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

module.exports = {
  allFielsPostValidation,
  categoryIdsValidation,
};