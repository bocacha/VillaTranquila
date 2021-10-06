const { DataTypes, Sequelize} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('User', {
    ID:{
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate:{
        is:'^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$',
        isUUID: 4, 
      }
    },
    UserName:{
      type: DataTypes.STRING,
      allownull: false,
     },
    FirstName:{
    type: DataTypes.STRING,
    allownull: false,
    validate:{
        isAlpha:{
          args:true,
          msg:"El Username solo puede contener letras"
        }
      }
   },
   LastName:{
    type: DataTypes.STRING,
    allownull: false,
    validate:{
        isAlpha:{
          args:true,
          msg:"El Username solo puede contener letras"
        }
      }
   },

   UserPasswordHashed:{
    type: DataTypes.STRING,
    allownull: false,
   },
   Address:{
     type: DataTypes.STRING,
     allownull: false
   },
   Phone:{
     type: DataTypes.STRING,
     allowNull: false
   },
   Premium:{
    type: DataTypes.BOOLEAN ,
    defaultValue: false,
    allowNull: false,
   }, 
   Admin:{ 
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
    Email:{
      type: DataTypes.STRING,
    allowNull: false,validate:{
        isEmail:{
          args:true,
          msg:"El Email debe ser un correo valido"
        }
      }
  },
   ReservationsHistory:{
    type: DataTypes.JSON,
    defaultValue: [],
    allowNull: false,
   },
   Blocked:{
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
   },
  },{timestamps: false,});
};