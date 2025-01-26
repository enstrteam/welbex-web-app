'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // Ассоциация с моделью User (пост принадлежит пользователю)
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
      });
    }
  }

  Post.init(
    {
      content: DataTypes.STRING,
      image: DataTypes.STRING,
      video: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      imageType: DataTypes.STRING,  
      videoType: DataTypes.STRING,  
    },
    {
      sequelize,
      modelName: 'Post'
    }
  );

  return Post;
};
