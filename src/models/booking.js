'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    flightID: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    userID: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type:DataTypes.ENUM,
      allowNull: false,
      defaultValue: "InProgress",
      values: ["InProgress","Booked","Cancelled"]
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};