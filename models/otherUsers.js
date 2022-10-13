const mongoose = require("mongoose")

const otherUsers = new mongoose.Schema({
    username:{type:String , required:true},
    socketId:{type:String , required:true},
    mongoId:{type:String , required:true},
})

module.exports = mongoose.model("otherUser" , otherUsers)