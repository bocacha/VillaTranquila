const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Payments', {
    ID:{
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userName:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    userEmail:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    title:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    unitPrice:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    card:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    transactionDetails:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    payment_method_id:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    date_approved:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    date_last_updated:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    Show:{
      type:DataTypes.BOOLEAN, 
      defaultValue: true
    }
  },{timestamps: false,});
};