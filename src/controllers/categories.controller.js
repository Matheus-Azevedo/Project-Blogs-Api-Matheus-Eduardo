const status = require('../utils/status.code');
const categoriesService = require('../services/categories.services');

const getAllCategories = async (_req, res) => {
  try {
    const categories = await categoriesService.getAllCategories();
    return res.status(status.findStatus('REQUEST_OK')).json(categories);
  } catch (error) {
    return res.status(status.findStatus('INTERNAL_SERVER_ERROR')).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await categoriesService.createCategory(name);
    return res.status(status.findStatus('REQUEST_CREATED')).json(category);
  } catch (error) {
    return res.status(status.findStatus('INTERNAL_SERVER_ERROR')).json({ message: error.message });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
};