const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Payments', {
    ID:{
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    date_created:{
      type: DataTypes.JSON, 
      allowNull: true,
    },
    aplication_id:{
      type: DataTypes.JSON, 
      allowNull: true,
    },
    user_id:{
      type: DataTypes.JSON, 
      allowNull: true,
    },
    action:{
      type: DataTypes.JSON, 
      allowNull: true,
    },
    data:{
      type: DataTypes.JSON, 
      allowNull: true,
    },
    payment_id:{
      type: DataTypes.JSON, 
      allowNull: true,
    },
    Show:{
      type:DataTypes.BOOLEAN, 
      defaultValue: true
    }
  },{timestamps: false,});
};