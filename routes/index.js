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

// router.get("/getSpeech", (req, res, next) => {
//   requests("https://translate.google.com/translate_tts?ie=UTF-8&q=hi%20lokesh%20how%20are%20you&tl=en&total=1&idx=0&textlen=21&client=tw-ob&prev=input&ttsspeed=1")
//     .on("data", function (chunk) {
//       console.log(chunk);
//     })
//     .on("end", function (err) {
//       if (err) return console.log("connection closed due to errors", err);

//       console.log("end");
//     });
//   // requests(
//   //   {
//   //     url: "https://translate.google.com/translate_tts?ie=UTF-8&q=hi%20lokesh%20how%20are%20you&tl=en&total=1&idx=0&textlen=21&client=tw-ob&prev=input&ttsspeed=1",
//   //   },
//   //   (error, response, body) => {
//   //     if (error || response.statusCode !== 200) {
//   //       return res.status(500).json({ type: "error", message: error.message });
//   //     }
//   //     res.json(body);
//   //   }
//   // );
// });

module.exports = router;
