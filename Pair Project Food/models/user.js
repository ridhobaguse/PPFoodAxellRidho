"use strict";
const { Model, DataTypes } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
const main = require("../services/emailService");
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
    // VALIDASI
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email cannot be Empty",
          },
          notNull: {
            msg: "Email cannot be Empty",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password cannot be Empty",
          },
          notNull: {
            msg: "Password cannot be Empty",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (instance, options) => {
          const hash = hashPassword(instance.password);
          instance.password = hash;
          instance.role = "buyer";
          //Node Mailer
        },
        afterCreate: async (instance, option) => {
          await main();
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
