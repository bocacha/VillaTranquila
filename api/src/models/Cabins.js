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
    type: DataTypes.JSON,
    allowNull: false,
  },
   Price:{
    type: DataTypes.INTEGER ,
    allowNull: false,
   },
   Description:{
    type: DataTypes.STRING,
    allowNull: false,
   },
   Coffe:{
     type: DataTypes.BOOLEAN,
     allowNull: false,
     defaultValue: false
  },
  Microondas:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Calefaccion:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Barbecue:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Wifi:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Cleaning:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Refrigerator:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Stove:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Parking:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
  },{timestamps: false,});
};