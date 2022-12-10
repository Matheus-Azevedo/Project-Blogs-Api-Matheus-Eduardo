const status = require('../utils/status.code');
const postService = require('../services/post.services');

const getAllPosts = async (_req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(status.findStatus('REQUEST_OK')).json(posts);
  } catch (error) {
    res.status(status.findStatus('INTERNAL_SERVER_ERROR')).json({ message: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostById(id);
    if (!post) {
      return res.status(status.findStatus('NOT_FOUND')).json({ message: 'Post does not exist' });
    }
    res.status(status.findStatus('REQUEST_OK')).json(post);
  } catch (error) {
    res.status(status.findStatus('INTERNAL_SERVER_ERROR')).json({ message: error.message });
  }
};

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

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { id: userId } = req.user;
    const post = await postService.updatePost(id, title, content, userId);
    res.status(status.findStatus('REQUEST_OK')).json(post);
  } catch (error) {
    res.status(status.findStatus('INTERNAL_SERVER_ERROR')).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    await postService.deletePost(id, userId);
    res.status(status.findStatus('DELETED')).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(status.findStatus('INTERNAL_SERVER_ERROR')).json({ message: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};