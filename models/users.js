const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/t2s");
const plm = require("passport-local-mongoose")

const userSchema = mongoose.Schema({
  name:{type:String , required:true},
  email:{type:String , required:true},
  phoneNo:{type:String , required:true},
  age:{type:String , required:true},
  role:{type:String , default:"user" , enum:['user' , 'admin']}
})
userSchema.plugin(plm);

module.exports = mongoose.model("user" , userSchema)