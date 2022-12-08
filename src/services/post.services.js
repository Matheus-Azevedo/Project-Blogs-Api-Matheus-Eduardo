const Sequelize = require('sequelize');
const config = require('../config/config');
const { BlogPost, PostCategory } = require('../models');

// Transaction configuration
const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

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

module.exports = {
  createPost,
};