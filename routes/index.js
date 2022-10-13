var express = require("express");
const passport = require("passport");
var router = express.Router();
const localStrategy = require("passport-local");
const userModel = require("../models/users");
passport.use(
  new localStrategy({ usernameField: "email" }, userModel.authenticate())
);
const {
  userCreation,
  passport_authenticate,
  chatsPage,
  signupPage
} = require("../controllers/indexControllers");

//middlewares
const{isLoggedIn , checkIsLoggedIn} = require("../middlewares/middlewares")



router.get("/", function (req, res, next) {
  res.render("login");
});

// API OF userCreating
router.post("/create", userCreation);

// API OF loginCheck
router.post("/login", passport_authenticate);

// API OF chats Page
router.get("/chats", isLoggedIn ,chatsPage);

// API OF chats Page
router.get("/signup" , signupPage);

module.exports = router;
