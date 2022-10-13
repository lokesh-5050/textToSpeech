const io = require( "socket.io" )();
var userModel = require("../models/users");
const otherUsers = require("../models/otherUsers");
const socketapi = {
    io: io
};

var usernameFromMongo = [];
var userIdMongo = [];
var socketId = [];

// Add your socket.io logic here!
io.on( "connection", function( socket ) {
    // console.log( "A user connected" , socket.id );  

    //listening connected userId
    socket.on("connected_userId" ,async (data) => {
        // console.log(data);
    let index = userIdMongo.indexOf(data.userId)
    
        if(userIdMongo.includes(data.userId , index)){
            console.log("user id is already there");
           
            io.emit("online_users" , {usernameFromMongo , userIdMongo , socketId})
        }else {

            userIdMongo.push(data.userId)
            usernameFromMongo.push(data.userName)
            socketId.push(socket.id)
            let newUsers =  new otherUsers({
                username:data.userName,
                socketId:socket.id,
                mongoId:data.userId,
            })
            const newUserSaved = await newUsers.save()
            console.log(newUserSaved + ".././36");
            console.log(usernameFromMongo , userIdMongo , socketId);
            io.emit("online_users" , {usernameFromMongo , userIdMongo , socketId})

    
        }
        
        
    })

});
// end of socket.io logic

module.exports = socketapi;