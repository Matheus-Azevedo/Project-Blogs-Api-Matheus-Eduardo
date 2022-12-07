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
  });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, { through: PostCategory, foreignKey: 'categoryId', as: 'posts' });
    models.BlogPost.belongsToMany(models.Category, { through: PostCategory, foreignKey: 'postId', as: 'categories' });
  };

  return PostCategory;
}