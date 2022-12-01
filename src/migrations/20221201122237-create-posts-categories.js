'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('posts_categories', {
      post_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field : 'post_id',
        references: { model: 'blog_posts', key: 'id' },
      },
      category_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field : 'category_id',
        references: { model: 'categories', key: 'id' },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('posts_categories');
  }
};
