const mongoose = require('mongoose');

module.exports = mongoose.model('messages', new mongoose.Schema({
  askMeEmail : {type : String, required : true},
  askMeQuestion : {type : String, required : true},
}, {timestamps : true}));
