const passport = require("passport");
const userModel = require("../models/users");

//userCreation API function
exports.userCreation = async (req, res, next) => {
  const newUser = new userModel({
    username: req.body.username,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
    age: req.body.age,
  });

  userModel.register(newUser, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/");
    });
  });
};

// Api func of  userLogin check
(exports.passport_authenticate = passport.authenticate("local", {
  successRedirect: "/chats",
  failureRedirect: "/",
})),
  function (req, res, next) {};

//Api func of chats page
exports.chatsPage = (req, res, next) => {
  res.render("showchats");
};

//Api func of signup page
exports.signupPage = (req, res, next) => {
  res.render("signup");
};
