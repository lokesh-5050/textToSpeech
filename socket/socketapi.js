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



    //lets join the connected user in a room!

    socket.join(`${socket.id}`)
    io.to(`${socket.id}`).emit("welcome" , "hey welcome to this room + ` ${socket.id}` ")
    // socket.join(["room1 , room2"])
    console.log("User connected");
    // io.to("room1").emit("hey")
    // console.log( "A user connected" , socket.id );  
    // console.log(socket.rooms);
    //listening connected userId
    socket.on("connected_userId" ,async (data) => {
        
        let index = userIdMongo.indexOf(data.userId)
    
        if(userIdMongo.includes(data.userId , index)){
            console.log("user id is already there");
           
            io.emit("online_users" , {usernameFromMongo , userIdMongo , socketId})
        }else {

            userIdMongo.push(data.userId)
            usernameFromMongo.push(data.userName)
            socketId.push(socket.id)
           
            console.log(usernameFromMongo , userIdMongo , socketId);
            io.emit("online_users" , {usernameFromMongo , userIdMongo , socketId})
        }
        
        
    })


    //listening private msg send by one frnd to other
    socket.on("private_msg" , async(data)=>{
        let index = usernameFromMongo.indexOf(data.frndMongo_Name)
        console.log(index);
        let thatFrndSocketId = socketId[index]
        console.log(thatFrndSocketId);
        let msgs = data.type_msg
        let loginUserMongoId = data.loginUserMongoId

        let indexForSendersName = userIdMongo.indexOf(loginUserMongoId)
        let sendersUsername = usernameFromMongo[indexForSendersName]


        // let frndSchema = await userModel.findOne({_id: data.frndMongo_id})
        // console.log(frndSchema);

        socket.to(`${thatFrndSocketId}`).emit("msg" , {msgs , thatFrndSocketId , sendersUsername , loginUserMongoId  })

        // socket.emit("private_msg" , {msgs , thatFrndSocketId})  
        console.log(msgs);
    })


    //on disconnect logic
    socket.on("disconnect", function (data) {
        let index = socketId.indexOf(socket.id)
        var disconnectedUser = usernameFromMongo[index]
        // io.emit("disconnectedUser" , disconnectedUser)
        
        usernameFromMongo.splice(index, 1)
        userIdMongo.splice(index, 1)
        socketId.splice(index , 1)

        io.emit("online_users" , {usernameFromMongo , userIdMongo , socketId})




    })

});
// end of socket.io logic

module.exports = socketapi;