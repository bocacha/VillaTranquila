const { DataTypes, Sequelize} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Reservations', {
    ID:{
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    Checkin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Checkout:{
      type: DataTypes.STRING,
      allowNull: false
    },
    UserId:{
      type: DataTypes.STRING,
      allowNull: false
    },
    Paymentsid:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    Cabinid:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    ExtraServices:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  },{timestamps: false,});
};