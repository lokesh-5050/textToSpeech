var messageModel = require("../models/messages")
var userModel = require("../models/users")

exports.allMessages = async(req,res,next) =>{
    // let loggedInUser = await userModel.findOne({_id:req.user._id})
    // in this loggedInUser the last login user is coming so i can't access current user
    // so now i have to send the loggedInUser in params too...
    let from = req.params.loginUser
    console.log(from + "...from");
    let to = req.params.grabFrndUsername
    console.log(to + "...from");

    const messagesOfTwoUser = await messageModel.find({users:{$all:[from , to ]}})
    // const messagesOfTwoUser = await messageModel.find({users:{$all : {$elemMatch : {from , to}}}})

    console.log(messagesOfTwoUser);

    if(messagesOfTwoUser !== null){

        res.json({messagesOfTwoUser})
    }


}