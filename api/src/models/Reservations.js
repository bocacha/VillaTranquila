const { DataTypes, Sequelize} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Reservations', {
    ID:{
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate:{
        is: '^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$',
      }
    },
    Checkin: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate:{
      //   isDate: true,
      // }
    },
    Checkout:{
      type: DataTypes.STRING,
      allowNull: false,
      // validate:{
      //   isDate: true,
      // }
    },
    UserId:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        is: '^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$',
      }
    },
    CostoFinal:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isNumeric: true,  
      }
    },
    CabinNumber:{
      type: DataTypes.STRING,
      allowNull:false,

    },
    Cabinid:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        is: '^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$',
      }
    },
    ExtraServices:{
      type: DataTypes.JSON,
      allowNull: true,
    },
    Anombrede:{
      type: DataTypes.STRING,
      allownull: false

    },
    Show:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true,
      validate:{}
     }
  },{timestamps: false,});
};