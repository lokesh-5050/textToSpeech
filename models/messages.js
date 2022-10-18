const mongoose = require("mongoose")

const messageModel = mongoose.Schema({
    message:{
        type:String,
    },
    users:Array,
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }

}, {timestamps: true})

module.exports = mongoose.model("messages" , messageModel)