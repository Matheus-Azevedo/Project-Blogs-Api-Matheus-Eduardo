const status = require('../utils/status.code');
const postService = require('../services/post.services');

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    const blogPost = await postService.createPost(title, content, id, categoryIds);
    res.status(status.findStatus('REQUEST_CREATED')).json(blogPost);
  } catch (error) {
    res.status(status.findStatus('INTERNAL_SERVER_ERROR')).json({ message: error.message });
  }
};

module.exports = {
  createPost,
};