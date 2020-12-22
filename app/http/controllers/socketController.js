const io = require('./../../../app.js');
const OnlineModel = require('./../../models/onlineModel.js');

io.on('connect', socket => {
  new OnlineModel({id : socket.id}).save((err) => {
   if(err) throw err;
  });
  socket.emit('amOnline');

  socket.on('disconnect', () => {
    OnlineModel.deleteOne({id : socket.id}, (err) => {
      if(err) {

      }
    });
  });
});
