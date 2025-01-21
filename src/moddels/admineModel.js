const mongoose = require("mongoose")

const AdmineSchema = new mongoose.Schema({
     name : {type:String,required:true},
     email : {type:String , unique:true , required:true},
     password : {type:String,required:true,minLen:8},
     role : {type:String , default:'admine'}

  });

  const AdmineModel = mongoose.model('Admine',AdmineSchema );

  module.exports = AdmineModel