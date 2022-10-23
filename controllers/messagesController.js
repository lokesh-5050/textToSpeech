var messageModel = require("../models/messages");
var userModel = require("../models/users");

exports.allMessages = async (req, res, next) => {
  // let loggedInUser = await userModel.findOne({_id:req.user._id})
  // in this loggedInUser the last login user is coming so i can't access current user
  // so now i have to send the loggedInUser in params too...
  let fromName = req.params.loginUserName;
  let fromId = req.params.loginUserId;
  console.log(fromName + "...from");
  let to = req.params.grabFrndUsername;
  console.log(to + "...to");

  const Messages = await messageModel.find({users:{$all: [fromName , to]}}).sort({updatedAt : 1})

  const gotThoseMessages = Messages.map((msg) => {
    return{

        byMe:msg.sender.toString() === fromId,
        
        message:msg.message,
        time:msg.time
    }  
    
  })

  console.log(gotThoseMessages);
  res.json(gotThoseMessages);
                                        
  // const messagesOfTwoUser = await messageModel.find({users:{$all : {$elemMatch : {from , to}}}})


};
