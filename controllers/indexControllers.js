const passport = require("passport");
const userModel = require("../models/users");
const otherUser = require("../models/otherUsers")
const io = require("socket.io")

const mongoose = require("mongoose")




//userCreation API function
exports.userCreation = async (req, res, next) => {
  const newUser = new userModel({
    username: req.body.username,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
    age: req.body.age,
  });

  userModel.register(newUser, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function (err) {
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
exports.chatsPage = async(req, res, next) => {
  const loggedInUser = await userModel.findOne({_id:req.user._id})
  // console.log(loggedInUser);

  const otherUsersExceptMe = await otherUser.find({_id : { $ne : loggedInUser._id }})
  console.log(otherUsersExceptMe + "./././line 40" ,  loggedInUser._id);
  res.render("showchats" , {user:loggedInUser , frnds:otherUsersExceptMe});   
};

//Api func of signup page
exports.signupPage = (req, res, next) => {
  res.render("signup");
};
