var messageModel = require("../models/messages")
var userModel = require("../models/users")

exports.allMessages = async(req,res,next) =>{
    let loggedInUser = await userModel.findOne({_id:req.user._id})
    let from = loggedInUser.username
    let to = req.params.grabFrndUsername
    const messagesOfTwoUser = await messageModel.find({users:{
        $all:[from , to ]
    }})

    if(messagesOfTwoUser){
        res.json({messagesOfTwoUser})
    }

}