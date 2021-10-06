const { DataTypes, Sequelize} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Services', {
    ID:{
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate:{
        is:'^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$',
        isUUID: 4, 
      }
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
      allowNull: false,
      validate:{
        isInt: true
      }
    },
    Show:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true
     }
  },{timestamps: false,});
};