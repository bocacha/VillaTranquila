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
      }
    },
    UserName:{
      type: DataTypes.STRING,
      allownull: false,
      validate:{
        len:{
          args:[5,20],
          msg:"El nombre de usuario tiene que contener entre  5 y 20 caracteres"
        }
      }
     },
    FirstName:{
    type: DataTypes.STRING,
    allownull: false,
    validate:{
      is:'[a-zA-Z\s]',
       
        len:{
          args:[4,20],
          msg:"El nombre tiene que contener entre  4 y 20 caracteres"
        }
      }
   },
   LastName:{
    type: DataTypes.STRING,
    allownull: false,
    validate:{
        is:'[a-zA-Z\s]',
        len:{
          args:[4,20],
          msg:"El apellido tiene que contener entre  4 y 20 caracteres"
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
    allowNull: true,
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
    allowNull: true,
   },
  },{timestamps: false,});
};