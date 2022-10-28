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

//oauth google
const GOOGLE_CLIENT_ID ="184644567601-712m204ljidhmliomk42a9deq45h7i4k.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const findOrCreate = require("mongoose-findorcreate");

var GoogleStrategy = require("passport-google-oauth2").Strategy;
var GitHubStrategy = require("passport-github2").Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      // console.log(profile);
      userModel.findOrCreate(
        { email: profile.email, username: profile.given_name  },
        function (err, user) {
          console.log(user);
          return done(err, user);
        }
      );
    }
  )
);

//oauth API
router.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile" ] })
);

router.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "/chats",
    failureRedirect: "/",
  })
);



//oauth github
passport.use(new GitHubStrategy({
  clientID: "9f40ffdbf3b47c015406",
  clientSecret: "14bb1e39679168930595cba20a37f16da9505e7d",
  callbackURL: "http://localhost:3000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  console.log(profile);
  userModel.findOrCreate({ email: profile.id , username: profile.displayName.split("-")[0]+Math.floor(Math.random()*1000) },
   function (err, user) {
    return done(err, user);
  });
}
));

//oauth gihub API
router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' , "profile" ] }));

router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/chats');
  });


//Login Page API
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
