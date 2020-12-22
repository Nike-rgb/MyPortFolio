const mongoose = require('mongoose');

module.exports = mongoose.model('user', new mongoose.Schema({
  firstName : {type : String, required : true},
  lastName : {type : String, required : true},
  email : {type : String, required : true, unique : true,},
  password : {type : String, required : true},
  role : {type : String, default : 'user'},
}, {timestamps : true}));
