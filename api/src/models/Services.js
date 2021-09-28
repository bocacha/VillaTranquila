const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Services', {
    ID:{
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    Price:{
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};