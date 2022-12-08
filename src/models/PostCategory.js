module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      onUpdate : 'CASCADE',
      onDelete : 'CASCADE',
      foreignKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      onUpdate : 'CASCADE',
      onDelete : 'CASCADE',
      foreignKey: true,
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'posts_categories',
  });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, { through: PostCategory, foreignKey: 'categoryId', otherKey: 'postId', as: 'blogPosts'});
    models.BlogPost.belongsToMany(models.Category, { through: PostCategory, foreignKey: 'postId', otherKey: 'categoryId', as: 'categories' });
  };

  return PostCategory;
}