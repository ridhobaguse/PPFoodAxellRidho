const express = require("express");
const UserController = require("../controllers/userController");
const AuthController = require("../controllers/authController");
const router = express.Router();

// LOGIN
router.get("/login", UserController.loginForm);
router.post("/login", UserController.postLogin);

// get register
router.get("/register", UserController.registerForm);
router.post("/register", UserController.postRegister);

// MIDDLEWARE
router.use(function (req, res, next) {
  console.log("Time:", Date.now());
  next();
});

// MAIN MENU
router.get("/mainMenu", UserController.mainMenu);

// MAIN MENU Seller
router.get("/mainMenuSeller", UserController.mainMenuSeller);

//list order item

// router.get("/items", UserController.listItems);
//post register
// router.post("/register", UserController.postRegister);

// // login form
// router.get("/login", UserController);

// // post login
// router.post("/login", UserController);

// router.get("", Controller.showRegistForm)

// router.post("", Controller.postRegistForm)

module.exports = router;
