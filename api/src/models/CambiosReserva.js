const { DataTypes, Sequelize} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('CambiosReserva', {
    ID:{
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        },  
    Original:{
      type: DataTypes.JSON,
      allownull: false,
        },
    Nuevo:{
      type: DataTypes.JSON,
      allownull: false
        },
    Done:{
        type: DataTypes.BOOLEAN,
        allownull:true,
        defaultValue: false
    },
    CancelChange:{
      type: DataTypes.BOOLEAN,
      allownull:true,
      defaultValue: false
  }
  },{timestamps: false,});
};