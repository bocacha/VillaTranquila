const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Notification', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    data:{
      type: DataTypes.JSON, 
      allowNull: true,
    }
  },{timestamps: false,});
};