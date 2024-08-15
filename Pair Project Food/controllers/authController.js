// controllers/authController.js
const { User } = require("../models/user");

class AuthController {
  static async loginForm(req, res) {
    try {
      res.render("login");
    } catch (error) {
      res.send(error.message);
    }
  }

  static async postLogin(req, res) {
    try {
      const { username, password } = req.body;

      // Authenticate user logic here (this is just a simple example)
      const user = await User.findOne({ where: { username, password } });
      if (user) {
        res.redirect("/items"); // Redirect to the items list page
      } else {
        res.send("Invalid username or password");
      }
    } catch (error) {
      res.send(error.message);
    }
  }
}

module.exports = AuthController;
