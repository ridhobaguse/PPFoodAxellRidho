const express = require("express");
const UserController = require("../controllers/userController");
const AuthController = require("../controllers/authController");
const router = express.Router();

// LOGIN
router.get("/login", UserController.loginForm);
router.post("/login", UserController.postLogin);

// REGISTER
router.get("/register", UserController.registerForm);
router.post("/register", UserController.postRegister);

// MIDDLEWARE
router.use(function (req, res, next) {
  console.log("Time:", Date.now());
  next();
});

// MAIN MENU BUYER, LIST MAKANAN BUY
router.get("/mainMenu", UserController.mainMenu);

// MAIN MENU SELLER, LIST MAKANAN UNTUK DI CREATE, UPDATE, DELETE
router.get("/mainMenuSeller", UserController.mainMenuSeller);

// BUYER CHECKOUT NAMPILIN SEMUA
router.get("/buyerCheckout", UserController.buyerCheckout);

// EDIT SELLER
router.get("editSeller", UserController.editSeller);

// POST EDIT SELLER
router.post("editSeller", UserController.postEditSeller);

// USER PROFILE
router.get("/userProfile", UserController.userProfile);

module.exports = router;
