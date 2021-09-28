const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Cabañas', {
  ID:{
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },   
  Number:{
    type: DataTypes.STRING,
    allowNull: false     
  },
  Capacity:{
    type: DataTypes.INTEGER,
    allownull:false,
  },
   Available:{ 
    type: DataTypes.JSON,
    allowNull: false,
  },
   Price:{
    type: DataTypes.JSON ,
    allowNull: false,
   },
   Description:{
    type: DataTypes.STRING,
    allowNull: false,
   }
  });
};
