const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/t2s");
const plm = require("passport-local-mongoose")
const findOrCreate = require('mongoose-findorcreate')

const userSchema = mongoose.Schema({
  username:{type:String },
  email:{type:String },
  phoneNo:{type:String },
  age:{type:String },
  role:{type:String , default:"user" , enum:['user' , 'admin']}
})
userSchema.plugin(plm , {usernameField:'email'});
userSchema.plugin(findOrCreate)

module.exports = mongoose.model("user" , userSchema)
