const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Payments', {
    ID:{
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    }, 
    Amount:{
        type: DataTypes.STRING,
        allowNull: false
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
