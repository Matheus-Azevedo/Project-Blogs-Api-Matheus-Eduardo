const { Category } = require('../models');

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

const getCategoryById = async (id) => {
  const category = await Category.findByPk(id);
  return category;
};

const createCategory = async (name) => {
  const category = await Category.create({ name });
  return category;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
};