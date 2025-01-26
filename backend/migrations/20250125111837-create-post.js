'use strict';

const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Posts', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      content: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
      },
      image: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      video: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      imageType: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      videoType: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },  
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.NOW
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.NOW
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Posts');
  }
};
