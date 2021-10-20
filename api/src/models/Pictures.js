const { DataTypes, Sequelize} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Pictures', {
    ID:{
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CabainNumber: {
      type: DataTypes.STRING,
      allowNull:false
    },
    Url:{
      type: DataTypes.STRING,
      allowNull:false
    },
    Show:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true
     }
  },{timestamps: false,});
};