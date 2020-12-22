const mongoose = require('mongoose');

module.exports = mongoose.model('hire', new mongoose.Schema({
  firstName : {type : String, required : true},
  lastName : {type : String, required : true},
  email : {type : String, required : true},
  hiringReason : {type : String, required : true},
}, {timestamps : true}));
