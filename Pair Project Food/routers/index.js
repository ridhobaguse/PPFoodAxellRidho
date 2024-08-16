const express = require("express");
const UserController = require("../controllers/userController");
// const AuthController = require("../controllers/authController");
const router = express.Router();

// LOGIN
// router.get("/home", UserController.home);

const checkLogin = (req, res, next) => {
  if (
    req.session.userId &&
    (req.path === "/login" || req.path === "/register")
  ) {
    res.redirect(`/mainMenu`);
  } else {
    next();
  }
};

router.get("/login", checkLogin, UserController.loginForm);
router.post("/login", UserController.postLogin);

// REGISTER
router.get("/register", checkLogin, UserController.registerForm);
router.post("/register", UserController.postRegister);

// MIDDLEWARE
router.use((req, res, next) => {
  if (!req.session.userId) {
    let error = "Please login First!";
    res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
});

// MAIN MENU BUYER, LIST MAKANAN BUY
router.get("/mainMenu", UserController.mainMenu);

// MAIN MENU SELLER, LIST MAKANAN  YANG ADA DI MAIN MENU SELLER
router.get("/mainMenuSeller", UserController.mainMenuSeller);

// POST EDIT MAIN MENU SELLER ?
router.post("/mainMenuSeller", UserController.editMainMenuSeller);

// GET UPDATE MAIN MENU SELLER
router.get("/updateMenu/:itemId/update", UserController.updateMenu);

// POST UPDATE MAIN MENU SELLER
router.post("/updateMenu/:itemId/update", UserController.postUpdateMenu);

// DELETE MAIN MENU SELLER ATAU DELETE MAKANAN DI MAIN MENU SELLER
router.get(
  "/mainMenuSeller/:itemId/delete",
  UserController.deleteMainMenuSeller
);

// BUYER CHECKOUT GET NAMPILIN SEMUA MAKANAN YANG DIBELI BUYER BELOM DIBUAT
router.get("/buyerCheckout", UserController.buyerCheckout);

// EDIT SELLER ATAU GET HALAMAN CREATE MAKANAN
router.get("/editSeller", UserController.editSeller);

// POST EDIT SELLER ATAU POST HALAMAN CREATE MAKANAN
router.post("/editSeller", UserController.postEditSeller);

// USER PROFILE BELOM DIBUAT
router.get("/userProfile", UserController.userProfile);

// POST USER PROFILE BELOM DIBUAT
router.post("/userProfile", UserController.postUserProfile);

// ROUTER LOGOUT
router.get("/logout", UserController.logOutUser);

module.exports = router;
