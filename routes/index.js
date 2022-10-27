var express = require("express");
const passport = require("passport");
var router = express.Router();
var app = require("../app");
const localStrategy = require("passport-local");
const userModel = require("../models/users");
const requests = require("requests");
passport.use(
  new localStrategy({ usernameField: "email" }, userModel.authenticate())
);
const {
  userCreation,
  passport_authenticate,
  logOut,
  chatsPage,
  signupPage,
  checkOnlineUsers,
  sayThisMsg
  // getSpeech
} = require("../controllers/indexControllers");

//message handler
const { allMessages } = require("../controllers/messagesController");

//middlewares
const { isLoggedIn, checkIsLoggedIn } = require("../middlewares/middlewares");
const { request } = require("express");

router.get("/", function (req, res, next) {
  res.render("login");
});

// API OF userCreating
router.post("/create", userCreation);

// API OF loginCheck
router.post("/login", passport_authenticate);

// API OF logOut
router.get("/logout", logOut);

// API OF chats Page
router.get("/chats", isLoggedIn, chatsPage);

// API OF chats Page
router.get("/signup", signupPage);

//Api of allMessages
router.get(
  "/allMessages/:grabFrndUsername/:loginUserName/:loginUserId",
  allMessages
);

router.get("/say/:sayThisMsg" , sayThisMsg)

module.exports = router;
