const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Payments', {
    ID:{
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    status:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    status_detail:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    transaction_detail:{
      type:DataTypes.JSON,
      allowNull: false,
    },
    id_reserva:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    fecha:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    Show:{
      type:DataTypes.BOOLEAN, 
      defaultValue: true
    },
  },{timestamps: false,});
};