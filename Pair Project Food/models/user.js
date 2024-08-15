"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here 1-1
      User.hasOne(models.UserProfile, {
        foreignKey: "UserId",
      });
      // one to many ke Orders
      User.hasMany(models.Order, {
        foreignKey: "UserId",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(instance, options) {
          const hash = hashPassword(instance.password);

          instance.password = hash;
          instance.role = "buyer";
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
