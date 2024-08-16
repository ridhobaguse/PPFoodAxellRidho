const {
  User,
  Item,
  Order,
  UserProfile,
  Category,
  OrderItem,
} = require("../models/index");
const bcryptjs = require("bcryptjs");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { formatRupiah } = require("../helpers/formatRupiah");
// V = SELSAI, !!! = BELOM SELSAI
class UserController {
  // HOME
  // static async home(req, res) {
  //   try {
  //     res.render("/mainMenu");
  //   } catch (error) {
  //     res.send(message);
  //   }
  // }

  // LOGIN V
  static async loginForm(req, res) {
    try {
      const { error } = req.query;
      res.render("login", { error });
    } catch (error) {
      res.send(message.error);
    }
  }

  //POST LOGIN V
  static async postLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (user) {
        const validPassword = comparePassword(password, user.password);
        if (validPassword) {
          req.session.userId = user.id;
          // res.redirect("/home");
          if (user.role === "admin") {
            res.redirect("/mainMenuSeller");
          } else {
            res.redirect("/mainMenu");
          }
        } else {
          const error = "Invalid User or Password";
          res.redirect(`/login?error=${error}`);
        }
      } else {
        const error = "Invalid User or Password";
        res.redirect(`/login?error=${error}`);
      }
    } catch (error) {
      res.send(error.message);
    }
  }
  /*
static async login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (user) {
            const validPassword = comparePassword(password, user.password);

            if (validPassword) {
                req.session.userId = user.id;

                // Redirect based on user role
                if (user.role === "admin") {
                    res.redirect("/mainMenuSeller");
                } else {
                    res.redirect("/mainMenu");
                }
            } else {
                const error = "Invalid User or Password";
                res.redirect(`/login?error=${error}`);
            }
        } else {
            const error = "Invalid User or Password";
            res.redirect(`/login?error=${error}`);
        }
    } catch (error) {
        res.send(error.message);
    }
}
*/

  // if (user.role === "admin") {
  //   res.redirect("/mainMenuSeller");
  // } else {
  //   res.redirect("/mainMenu");
  // }

  // REGISTER V
  static async registerForm(req, res) {
    try {
      res.render("register");
    } catch (error) {
      res.send(error.message);
    }
  }

  //POST REGISTER V
  static async postRegister(req, res) {
    try {
      const { email, password } = req.body;
      const new_user = await User.create({ email, password });

      await UserProfile.create({
        UserId: new_user.id,
      });
      res.redirect("/login");
    } catch (error) {
      res.send(error.message);
    }
  }

  // MAIN MENU BUYER V
  static async mainMenu(req, res) {
    try {
      const searchQuery = req.query.search || "";
      const sort = req.query.sort || "name";
      const order = req.query.order === "desc" ? "DESC" : "ASC";

      const item = await Item.findItem(searchQuery, sort, order);

      res.render("mainMenu", { item, formatRupiah, searchQuery, sort, order });
    } catch (error) {
      res.send(error.message);
    }
  }

  // MAIN MENU SELLER V
  static async mainMenuSeller(req, res) {
    try {
      const item = await Item.findAll({
        include: Category,
      });
      res.render("mainMenuSeller", { item, formatRupiah });
    } catch (error) {
      res.send(error.message);
    }
  }

  // POST EDIT MAIN MENU GATAU JGN DI DELETE V
  static async editMainMenuSeller(req, res) {
    try {
      const { CategoryId, ItemId } = req.params;
      console.log("YYYYYY");

      let { errors } = req.query;
      if (errors) {
        errors = errors.split(",");
      }
      const data = await Item.findByPk(ItemId, { Category });
      res.render("editSeller", { CategoryId, data, errors });
    } catch (error) {
      console.log(error);

      res.send(error.message);
    }
  }

  // UPDATE MAIN MENU SELLER V
  static async updateMenu(req, res) {
    try {
      // console.log(req.params);
      console.log("MASUK SHOW UPDATE MENU");
      const { errors } = req.query;

      // console.log(errors);
      // const newError = [
      //   errors.name,
      //   errors.description,
      //   errors.price,
      //   errors.imgUrl,
      //   erro,
      // ];

      const { itemId } = req.params;

      let item = await Item.findByPk(itemId);

      res.render(`updateMenu`, { item, errors });
    } catch (error) {
      res.send(error.message);
    }
  }

  // POST UPDATE MAIN MENU SELLER V
  static async postUpdateMenu(req, res) {
    try {
      console.log(req.body, "<<<<");
      console.log("MASUK KE POST UPDATE MENU");

      let { itemId } = req.params;
      let { name, description, price, imgUrl, CategoryId } = req.body;

      await Item.update(
        {
          name,
          description,
          price,
          imgUrl,
          CategoryId,
        },
        {
          where: {
            id: +itemId,
          },
        }
      );

      res.redirect("/mainMenuSeller");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const { itemId } = req.params;
        const errors = error.errors.map((el) => el.message);

        res.redirect(`/updateMenu/${itemId}/update?errors=${errors}`);
      } else {
        res.send(error);
      }
    }
  }

  // DELETE MAIN MENU SELLER V
  static async deleteMainMenuSeller(req, res) {
    try {
      const { itemId } = req.params;
      const deleteItem = await Item.findByPk(itemId);

      if (deleteItem) {
        await Item.destroy({ where: { id: itemId } });
        res.redirect("/mainMenuSeller");
      } else {
        res.redirect("/mainMenuSeller");
      }
    } catch (error) {
      res.send(error);
    }
  }

  // BUYER CHECKOUT V
  static async buyerCheckout(req, res) {
    try {
      res.render("buyerCheckout");
    } catch (error) {
      res.send(error.message);
    }
  }

  // EDIT SELLER ATAU CREATE SELLER V
  static async editSeller(req, res) {
    try {
      // console.log(req.body);

      res.render("editSeller");
    } catch (error) {
      res.send(error.message);
    }
  }

  // POST EDIT SELLER ATAU CREATE SELLER V
  static async postEditSeller(req, res) {
    try {
      const { name, description, price, imgUrl, CategoryId } = req.body;
      // console.log(req.body, "<><><>");
      console.log("YYYYYY");

      await Item.create({ name, description, price, imgUrl, CategoryId });
      res.redirect("/mainMenuSeller");
    } catch (error) {
      res.send(error.message);
    }
  }

  // USER PROFILE
  static async userProfile(req, res) {
    try {
      const userProfile = await UserProfile.findOne();
      res.render("userProfile", { userProfile });
    } catch (error) {
      res.send(error);
    }
  }

  // POST USER PROFILE masih belum
  static async postUserProfile(req, res) {
    try {
      const { firstName, lastName, phoneNumber, address } = req.body;
      const userId = req.user ? req.user.id : null;
      const userProfile = await UserProfile.findOne({ where: { userId } });
      await userProfile.update({
        firstName,
        lastName,
        phoneNumber,
        address,
      });
      res.redirect("/userProfile");
    } catch (error) {
      res.send(error.message);
    }
  }

  // LOGOUTUSER DI MAIN MENU V
  static async logOutUser(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.send(err.message);
        }
        res.redirect("/login");
      });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async orderItem(req, res) {
    try {
      res.render("orderItem");
    } catch (error) {
      res.send(error.message);
    }
  }
}

module.exports = UserController;
