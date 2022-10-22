const io = require( "socket.io" )();
var userModel = require("../models/users");
var messageModel = require("../models/messages")
const socketapi = {
    io: io
};


// // Import the functions you need from the SDKs you need
// const {initializeApp} = require("firebase/app")
// const {getAnalytics} = require("firebase/analytics")

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyA1DVp5MNmDX_ulB5NXF7n8A7uZhtLAAtY",
//   authDomain: "tellemm-2a6a0.firebaseapp.com",
//   projectId: "tellemm-2a6a0",
//   storageBucket: "tellemm-2a6a0.appspot.com",
//   messagingSenderId: "630478718816",
//   appId: "1:630478718816:web:bb1c6044a9ef99f99f0005",
//   measurementId: "G-3WMGT5TTRB"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

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
        // console.log(index);
        let frndUsername = usernameFromMongo[index]
        let thatFrndSocketId = socketId[index]
        let thatFrndMongoId = userIdMongo[index]
        // console.log(thatFrndSocketId);
        let msgs = data.type_msg
        let loginUserMongoId = data.loginUserMongoId
        var sentMessage = data.type_msg
        let indexForSendersName = userIdMongo.indexOf(loginUserMongoId)
        let sendersUsername = usernameFromMongo[indexForSendersName]


        // let frndSchema = await userModel.findOne({_id: data.frndMongo_id})
        // console.log(frndSchema);
        let newMessage = await messageModel.create({
            message : msgs,
            users:[sendersUsername , frndUsername ],
            sender:loginUserMongoId
        })

        console.log(newMessage + ",..//msg added to mongo");
        socket.emit("you_sent_this_msg" , {sentMessage , sendersUsername ,frndUsername})
        socket.to(`${thatFrndSocketId}`).emit("msg" , {msgs , thatFrndSocketId , sendersUsername , loginUserMongoId , thatFrndMongoId  , frndUsername  })

        // socket.emit("private_msg" , {msgs , thatFrndSocketId})  
        console.log(msgs);
    })


    //on disconnect logic
    socket.on("disconnect", function (data) {
        let index = socketId.indexOf(socket.id)
        var disconnectedUser = usernameFromMongo[index]
        // io.emit("disconnectedUser" , disconnectedUser)
        let disconnectedUsername = usernameFromMongo[index]
        usernameFromMongo.splice(index, 1)
        userIdMongo.splice(index, 1)
        socketId.splice(index , 1)
        console.log(disconnectedUsername + "...disconnectedUsername");
        io.emit("online_users" , {usernameFromMongo , userIdMongo , socketId})




    })

});
// end of socket.io logic

module.exports = socketapi;