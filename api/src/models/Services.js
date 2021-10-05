const { DataTypes, Sequelize} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Services', {
    ID:{
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
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
    },
    Show:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true
     }
  },{timestamps: false,});
};