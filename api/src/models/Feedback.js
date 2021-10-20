const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Cabins', {
  ID:{
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },   
  Name:{
    type: DataTypes.STRING,
    allowNull: false     
  },
  Description:{
    type: DataTypes.STRING,
    allownull:false,
  },
  Stars:{
    type: DataTypes.INTEGER,
    allowNull: false     
  },
  Show:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:true
   }
  },{timestamps: false,});
};