const Sequelize = require('sequelize');
const config = require('../config/config');
const { BlogPost, PostCategory, Category, User } = require('../models');

// Transaction configuration
const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return post;
};

const getPostBySearchTerm = async (searchTerm) => {
  if (searchTerm === '') return getAllPosts();
  const posts = await BlogPost.findAll({
    where: {
      [Sequelize.Op.or]: [
        { title: { [Sequelize.Op.like]: `%${searchTerm}%` } },
        { content: { [Sequelize.Op.like]: `%${searchTerm}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

const createPost = async (title, content, userId, categoryIds) => {
  const t = await sequelize.transaction();
  try {
    const blogPost = await BlogPost.create({ title, content, userId }, { transaction: t });
    const postCategories = categoryIds.map((categoryId) => ({
      postId: blogPost.id,
      categoryId,
    }));
    await PostCategory.bulkCreate(postCategories, { transaction: t });
    await t.commit();
    return blogPost;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const updatePost = async (id, title, content) => {
  await BlogPost.update({ title, content }, { where: { id } });
  const updatedPost = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return updatedPost;
};

const deletePost = async (id) => {
  await BlogPost.destroy({ where: { id } });
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostBySearchTerm,
  createPost,
  updatePost,
  deletePost,
};