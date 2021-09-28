const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Payments', {
    ID:{
      type: DataTypes.UUID,
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
  });
};
