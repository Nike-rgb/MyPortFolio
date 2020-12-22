const mongoose = require('mongoose');

module.exports = mongoose.model('online', new mongoose.Schema({
  //details about the online user
  id : String,
}, {timestamps : true}));
