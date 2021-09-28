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
    }
  },{timestamps: false,});
};