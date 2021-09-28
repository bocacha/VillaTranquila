const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Reservations', {
    ID:{
      type: DataTypes.UUID,
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
  });
};