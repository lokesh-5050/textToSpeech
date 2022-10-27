const passport = require("passport");
const userModel = require("../models/users");
const io = require("socket.io");
const mongoose = require("mongoose");
const say = require("say")
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

// Api fnc of logOut

exports.logOut = (req, res, next) => {
  req.logout(function (err) {
    if (err) throw err;
    res.redirect("/");
  });
};

//Api func of chats page
exports.chatsPage = async (req, res, next) => {
  const loggedInUser = await userModel.findOne({ _id: req.user._id });
  // console.log(loggedInUser);

  // const fs = require('fs')
  // //getting url for the generated speech
  // const url = Gtts_api.getAudioBase64("hello lokesh", {lang: "en"}).then((base64) =>{
  //   console.log(base64);
  //   const buffer = Buffer.from(base64 , 'base64')
  //   fs.writeFileSync("audio.mp3", buffer , {encoding:"base64"})
  // })
  // // console.log(url);

  // const url = Gtts_api.getAudioUrl("hi lokesh how are you" , {lang:'en'})

  // console.log(url);
  
 


  
  

  // const otherUsersExceptMe = await otherUser.find({_id : { $ne : loggedInUser._id }})
  // console.log(otherUsersExceptMe + "./././line 40" ,  loggedInUser._id);
  res.render("showchats", { user: loggedInUser });
};

//Api func of signup page
exports.signupPage = (req, res, next) => {
  res.render("signup");
};

//Api fnc of /checkOnlineUsers
// exports.checkOnlineUsers = async(req,res,next) =>{
//   let logInUser = await userModel.findOne({_id:req.user._id})
//   let allUsersExcpetMe = await otherUser.find({_id:{$ne : logInUser._id}})
//   res.json(allUsersExcpetMe)
// }


exports.sayThisMsg = async(req,res,next)=>{
  const sayThis = req.params.sayThisMsg

  var voice = say.speak(sayThis , 'Alex' , 1)

  res.json(voice)
}