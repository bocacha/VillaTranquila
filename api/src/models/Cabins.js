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
  Number:{
    type: DataTypes.STRING,
    allowNull: false     
  },
  Capacity:{
    type: DataTypes.INTEGER,
    allownull:false,
  },
   Available:{ 
    type: DataTypes.STRING,
    allowNull: false,
  },
   Price:{
    type: DataTypes.STRING ,
    allowNull: false,
   },
   Description:{
    type: DataTypes.STRING,
    allowNull: false,
   }
  },{timestamps: false,});
};