const status = require('../utils/status.code');
const categoriesService = require('../services/categories.services');

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
  createCategory,
};