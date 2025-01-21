const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
     name : {type:String,required:true},
     email : {type:String , unique:true , required:true},
     password : {type:String,required:true,minLen:8},
     role : {type:String , default:'User'}

  });

  const UserModel = mongoose.model('User', UserSchema);

  module.exports = UserModel