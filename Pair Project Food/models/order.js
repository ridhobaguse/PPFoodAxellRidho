"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "UserId",
      });
      // many to many ke Items melalui OrderItems
      Order.belongsToMany(models.Item, {
        through: models.OrderItem,
        foreignKey: "OrderId",
      });
    }
  }
  Order.init(
    {
      UserId: DataTypes.INTEGER,
      orderDate: DataTypes.DATE,
      totalAmount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
