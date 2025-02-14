const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
     name : {type:String,required:true},
     email : {type:String , unique:true , required:true},
     password : {type:String,required:true,minLen:8},
     role : {type:String , default:'User'},
     image : {type:String , default:"https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg"}

  });

  const UserModel = mongoose.model('User', UserSchema);

  module.exports = UserModel