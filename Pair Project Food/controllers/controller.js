const {
  Category,
  Item,
  Order,
  OrderItem,
  User,
  UserProfile,
} = require("../models");
const { asd } = require("../helpers");
const { Op } = require("sequelize");
class Controller {
  showLoginPage(req, res) {
    res.render("login");
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user || !user.validPassword(password)) {
        return res.render("login", { error: "Invalid email or password" });
      }

      req.session.userId = user.id;
      res.redirect("/dashboard");
    } catch (error) {
      res.render("login", { error: "An error occurred, please try again" });
    }
  }

  showRegistrationPage(req, res) {
    res.render("register");
  }

  async register(req, res) {
    const { email, password, role } = req.body;

    try {
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.render("register", { error: "Email already in use" });
      }

      await User.create({ email, password, role });

      res.redirect("/login");
    } catch (error) {
      res.render("register", { error: "An error occurred, please try again" });
    }
  }

  logout(req, res) {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  }
}

module.exports = Controller;
