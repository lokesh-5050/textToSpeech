const passport = require("passport");
const userModel = require("../models/users");
const io = require("socket.io");
const mongoose = require("mongoose");
const Gtts_api = require("google-tts-api");
const playAudioURL = require("play-audio-url");
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

  //getting url for the generated speech
  const url = Gtts_api.getAudioUrl("hello lokesh", {
    lang: "en",
    slow: false,
    host: "https://translate.google.com",
  });

  console.log(url);

  //   const AudioContext = window.AudioContext  //|| window.webkitAudioContext
  //   var audioCtx = new AudioContext()
  
  //   var audioFile = fetch("https://translate.google.com/translate_tts?ie=UTF-8&q=hello%20lokesh&tl=en&total=1&idx=0&textlen=12&client=tw-ob&prev=input&ttsspeed=1").then(response => response.arrayBuffer()).then(buffer => audioCtx.decodeAudioData(buffer)).then(buffer =>{
  //     var track = audioCtx.createBufferSource()
  //     track.buffer = buffer
  //     track.connect(audioCtx.destination)
  //     track.start(0)
  //   })
  
  //   axios.get("https://translate.google.com/translate_tts?ie=UTF-8&q=hello%20lokesh&tl=en&total=1&idx=0&textlen=12&client=tw-ob&prev=input&ttsspeed=1")
  
  //   console.log(audioFile);

  

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
