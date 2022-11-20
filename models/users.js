const mongoose = require("mongoose");
try {
  mongoose.connect("mongodb://localhost/t2s");
  
} catch (error) {
  console.log(error);
}
const plm = require("passport-local-mongoose")
const findOrCreate = require('mongoose-findorcreate')

const userSchema =  mongoose.Schema({
  username:String,
  email:String ,
  phoneNo:Number ,
  age:Number ,
  role:{type:String , default:"user" , enum:['user' , 'admin']}
})
userSchema.plugin(plm , {usernameField:'email'});
userSchema.plugin(findOrCreate)

module.exports = mongoose.model("user" , userSchema)