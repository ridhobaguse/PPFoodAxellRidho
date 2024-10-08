"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItem.belongsTo(models.Order, {
        foreignKey: "OrderId",
      });

      // jalan many to many dari Item ke order
      OrderItem.belongsTo(models.Item, {
        foreignKey: "ItemId",
      });
    }
  }
  OrderItem.init(
    {
      OrderId: DataTypes.INTEGER,
      ItemId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      subTotal: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderItem",
    }
  );
  return OrderItem;
};
