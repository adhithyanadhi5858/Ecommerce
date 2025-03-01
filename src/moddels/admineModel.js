const mongoose = require("mongoose")

const AdmineSchema = new mongoose.Schema({
     name : {type:String,required:true},
     email : {type:String , unique:true , required:true},
     password : {type:String,required:true,minLen:8},
     role : {type:String , default:'admine'},
     image:{type:String, default:"https://as1.ftcdn.net/v2/jpg/05/79/55/26/1000_F_579552668_sZD51Sjmi89GhGqyF27pZcrqyi7cEYBH.jpg"}

  });

  const AdmineModel = mongoose.model('Admine',AdmineSchema );

  module.exports = AdmineModel