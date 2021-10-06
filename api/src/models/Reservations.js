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
    CostoFinal:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    Cabinid:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    ExtraServices:{
      type: DataTypes.JSON,
      allowNull: true,
    },
    Show:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true
     }
  },{timestamps: false,});
};