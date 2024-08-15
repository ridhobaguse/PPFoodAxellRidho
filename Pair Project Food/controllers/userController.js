const { User } = require("../models/index");
const bcryptjs = require("bcryptjs");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");

class UserController {
  // LOGIN
  static async loginForm(req, res) {
    try {
      const { error } = req.query;
      res.render("login", { error });
    } catch (error) {
      res.send(message.error);
    }
  }

  //POST LOGIN
  static async postLogin(req, res) {
    try {
      const { email, password } = req.body;
      const userName = await User.findOne({ where: { email } });

      if (userName) {
        const validPassword = comparePassword(password, userName.password);
        if (validPassword) {
          res.redirect("/mainMenu");
        } else {
          const error = "Invalid User or Password";
          res.redirect(`/login?error=${error}`);
        }
      } else {
        let error = "Invalid User or Password";
        res.redirect(`/login?error=${error}`);
      }
    } catch (error) {
      res.send(error.message);
    }
  }

  // REGISTER
  static async registerForm(req, res) {
    try {
      res.render("register");
    } catch (error) {
      res.send(error.message);
    }
  }

  //POST REGISTER
  static async postRegister(req, res) {
    try {
      const { email, password } = req.body;
      const new_user = await User.create({ email, password });
      res.redirect("/login");
    } catch (error) {
      res.send(error.message);
    }
  }

  // MAIN MENU BUYER
  static async mainMenu(req, res) {
    try {
      res.render("mainMenu");
    } catch (error) {
      res.send(error.message);
    }
  }

  // MAIN MENU SELLER
  static async mainMenuSeller(req, res) {
    try {
      res.render("mainMenuSeller");
    } catch (error) {
      res.send(error.message);
    }
  }
}

module.exports = UserController;
