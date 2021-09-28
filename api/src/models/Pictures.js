const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Pictures', {
    ID:{
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};