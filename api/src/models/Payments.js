const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Payments', {
    ID:{
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    TotalAmount:{
        type: DataTypes.STRING,
        allowNull: false
    },
    PaydAmount:{
      type: DataTypes.STRING
    },
    Date:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    idClient:{
      type: DataTypes.JSON, 
      allowNull: false,
    }
  },{timestamps: false,});
};
