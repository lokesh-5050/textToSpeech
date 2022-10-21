var express = require("express");
const passport = require("passport");
var router = express.Router();
var app = require("../app")
const localStrategy = require("passport-local");
const userModel = require("../models/users");
passport.use(
  new localStrategy({ usernameField: "email" }, userModel.authenticate())
);
const {
  userCreation,
  passport_authenticate,
  chatsPage,
  signupPage,
  checkOnlineUsers
} = require("../controllers/indexControllers");

//message handler
const {
  allMessages
} = require("../controllers/messagesController")

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

//Api of allMessages
router.get("/allMessages/:grabFrndUsername/:loginUserId" , allMessages);



module.exports = router;
