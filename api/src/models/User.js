const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('User', {
    ID:{
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    UserName:{
      type: DataTypes.STRING,
      allownull: false,
      validate:{
          isAlphanumeric:{
            args:true,
            msg:"El Username solo puede contener letras y numeros"
          }
        }
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

   UserPassword:{
    type: DataTypes.STRING,
    allownull: false,
    validate:{
        len:{
          args:[8,20],
          msg:"El UserPassword debe tener entre 8 y 20 caracteres"
        }
      }
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
    allowNull: false,
   }, 
   Admin:{ 
    type: DataTypes.BOOLEAN,
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
    allowNull: false,
   },
   Blocked:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
   },
  });
};
