const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Payments', {
    id:{
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title:{
      type: DataTypes.JSON, 
      allowNull: true,
    },
    unit_price:{
      type: DataTypes.INTEGER, 
      allowNull: true,
    },
    card:{
      type: DataTypes.JSON, 
      allowNull: true,
    },
    transaction_detail:{
      type: DataTypes.JSON, 
      allowNull: true,
    },
    payment_method_id:{
      type: DataTypes.JSON, 
      allowNull: true,
    },
    date_approved:{
      type: DataTypes.STRING, 
      allowNull: true,
    },
    date_last_updated:{
      type: DataTypes.STRING, 
      allowNull: true,
    },
    UserNAme:{
      type: DataTypes.STRING, 
      allowNull: true,
    },
    UserEMail:{
      type: DataTypes.STRING, 
      allowNull: true,
    }
  },{timestamps: false,});
};