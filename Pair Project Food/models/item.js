"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsToMany(models.Order, {
        through: models.OrderItem,
        foreignKey: "ItemId",
      });
      Item.belongsTo(models.Category, {
        foreignKey: "CategoryId",
      });
    }

    static async findItem(searchQuery, sort, order) {
      try {
        let item;

        if (searchQuery) {
          item = await Item.findAll({
            where: {
              name: {
                [Op.iLike]: `%${searchQuery}%`,
              },
            },
            order: [
              sort === "category"
                ? [
                    sequelize.literal(
                      `CASE WHEN "CategoryId" = 1 THEN 'Makanan' ELSE 'Minuman' END`
                    ),
                    order,
                  ]
                : [sort, order],
            ],
          });
        } else {
          item = await Item.findAll({
            order: [
              sort === "category"
                ? [
                    sequelize.literal(
                      `CASE WHEN "CategoryId" = 1 THEN 'Makanan' ELSE 'Minuman' END`
                    ),
                    order,
                  ]
                : [sort, order],
            ],
          });
        }

        return item;
      } catch (error) {
        throw error;
      }
    }

    static async findByCategoryName(categoryName) {
      const categoryMap = {
        Food: 1,
        Drinks: 2,
      };
      const CategoryId = categoryMap[categoryName];
      if (!CategoryId) {
        throw new Error("Invalid category name");
      }

      return await Item.findAll({ where: { CategoryId } });
    }

    get CategoryName() {
      return this.CategoryId === 1
        ? "Food"
        : this.CategoryId === 2
        ? "Drink"
        : "Unknown";
    }
  }

  Item.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name cannot be Empty",
          },
          notNull: {
            msg: "Name cannot be Empty",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notEmpty: {
            msg: "Description cannot be Empty",
          },
          notNull: {
            msg: "Description cannot be Empty",
          },
        },
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price cannot be Empty",
          },
          notNull: {
            msg: "Price cannot be Empty",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Img Url cannot be Empty",
          },
          notNull: {
            msg: "Img Url cannot be Empty",
          },
        },
      },
      CategoryId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Category Id cannot be Empty",
          },
          notNull: {
            msg: "Category Id cannot be Empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
